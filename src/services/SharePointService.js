import { default as http, setXRequestDigest } from "./http-sp-common";

// Default SP13 REST path
// const SPRESTPATH = '_vti_bin/ListData.svc/'
const SPRESTPATH = "/_api/web/lists/GetByTitle('{listName}')/Items";
let XDIGEST = "";

class SharePointService {
  // Get current user's details
  async userGet() {
    let requestUrl = "_api/sp.userprofiles.peoplemanager/getmyproperties";
    const response = await http.get(requestUrl);
    return response.data.d;
  }

  // Get user's Id - used when populating user columns
  async userGetId(userName) {
    try {
      let prefix = "i:0#.w|";
      let accountName = userName.indexOf(prefix) > -1 ? userName : prefix + userName;
      let requestUrl =
        `_api/web/siteusers(@v)?@v='${encodeURIComponent(accountName)}'`;
      const response = await http.get(requestUrl);
      return response.data.d;
    } catch (error) {
      console.error(error)
    }
  }

  // Returns an object with all the current user's details
  async userGetDetailAndId() {
    let userData, userId;
    return this.userGet().then(async response => {
      userData = response;
      const response_1 = await this.userGetId(userData.AccountName);
      userId = response_1;
      return {
        userData: userData,
        userId: userId
      };
    });
  }

  // Typeahead search for SP
  async userSearch(term) {
    let requestUrl =
      "_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser";
    return this.getFormDigest().then(async response => {
      let digest = response.data.d.GetContextWebInformation.FormDigestValue;
      let data = JSON.stringify({
        queryParams: {
          __metadata: {
            type: "SP.UI.ApplicationPages.ClientPeoplePickerQueryParameters"
          },
          AllowEmailAddresses: true,
          AllowMultipleEntities: false,
          AllUrlZones: false,
          MaximumEntitySuggestions: 50,
          PrincipalSource: 15,
          PrincipalType: 1,
          QueryString: term
        }
      });
      const response_1 = await http({
        method: "POST",
        data: data,
        url: requestUrl,
        headers: {
          "X-RequestDigest": digest
        }
      });
      return response_1.data.d;
    });
  }

  async get(listname, queryParams) {
    let config = null;
    if (queryParams) {
      config = { params: queryParams };
    }
    var requestUrl = SPRESTPATH.replace("{listName}", listname);
    const response = await http.get(requestUrl, config);
    return response.data.d;
  }

  async getURL(uri) {
    const response = await http.get(uri);
    return response.data.d;
  }

  // Get all items in a list
  async getAll(listname, queryParams) {
    let requestUrl = SPRESTPATH.replace("{listName}", listname);
    let config = null;
    if (queryParams) {
      config = { params: queryParams };
    }
    const response = await http.get(requestUrl, config);
    let results = response.data.d.results;
    let next = response.data.d.__next;
    while (next) {
      const res = await http.get(next);
      next = res.data.d.__next;
      results = results.concat(res.data.d.results);
    }
    return results;
  }

  // Get column choice values
  async getChoiceOptions(listName) {
    let requestUrl = `_api/web/lists/GetByTitle('${listName}')/fields`;
    const response = await http.get(requestUrl);
    // console.log(response);
    return response.data.d.results;
  }

  // Gets list total item count
  async getItemCount(listname) {
    let requestUrl = SPRESTPATH.replace("{listName}", listname).replace(
      "Items",
      "ItemCount"
    );
    const response = await http.get(requestUrl);
    return response.data.d.ItemCount;
  }

  // Gets a list item by id
  async getListItemById(listname, itemId, queryParms) {
    let config = null;
    if (queryParms) {
      config = { params: queryParms };
    }
    let requestUrl = `${SPRESTPATH.replace("{listName}", listname)}(${itemId})`;
    const response = await http.get(requestUrl, config);
    return response.data.d;
  }

  //Get a list by URL
  async getByUrl(url) {
    let listItemResults = [];
    const response = await http.get(url);
    listItemResults = response.data.d;
    return listItemResults;
  }

  // Posts to a list
  async post(listname, payload) {
    let requestUrl = SPRESTPATH.replace("{listName}", listname);
    const itemType = await http.get(
      `/_api/web/lists/getbytitle('${listname}')?$select=ListItemEntityTypeFullName`
    );
    payload["__metadata"] = {
      type: itemType.data.d.ListItemEntityTypeFullName
    };
    const resDigest = await http.post("/_api/contextinfo");
    setXRequestDigest(resDigest.data.d.GetContextWebInformation.FormDigestValue);
    const config = {
      headers: {
        "Content-Type": "application/json;odata=verbose",
      },
      xhrFields: {
        withCredentials: true
      }
    };
    const response = await http.post(requestUrl, payload, config);
    return response.data.d;
  }

  // Updates list item
  async update(metadata, data) {

    const resDigest = await http.post("/_api/contextinfo");
    setXRequestDigest(resDigest.data.d.GetContextWebInformation.FormDigestValue);

    data["__metadata"] = {
      type: metadata.type
    };

    const response = await http.post(metadata.uri, data, {
      headers: {
        "Content-Type": "application/json;odata=verbose",
        "X-HTTP-Method": "MERGE",
        "If-Match": "*"
      }
    });
    return response.data;
  }

  async addAttachment(spItem, data, fileName) {

    let attachmentsURI = spItem.AttachmentFiles.__deferred.uri;
    let encodedFileName = encodeURIComponent(fileName).replace(/'/g, "");

    const completeUri = `${attachmentsURI}/add(FileName='${encodedFileName}')`;
    const resDigest = await http.post("/_api/contextinfo");
    setXRequestDigest(resDigest.data.d.GetContextWebInformation.FormDigestValue);

    const response = await http.post(completeUri, data, {
      headers: {
        "Content-Type": "application/json;odata=verbose",
      },
      processData: false,
    });
    // console.log(response);
    return response;
  }

  async deleteAttachment(listname,itemID, fileName) {
    const attachmentUri = `/_api/web/lists/GetByTitle('${listname}')/GetItemById(${itemID})/AttachmentFiles/getByFileName('${fileName}')`;
    const resDigest = await http.post("/_api/contextinfo");
    setXRequestDigest(resDigest.data.d.GetContextWebInformation.FormDigestValue);
    const response = await http.post(attachmentUri, null, {
      headers: {
        "Content-Type": "application/json;odata=verbose",
        "X-HTTP-Method": "DELETE",
        "If-Match": "*"
      }
    });
    // console.log(response);
    return response;
  }

  // Delete list item
  async delete(listname, itemId) {
    const requestUrl = `${SPRESTPATH.replace("{listName}", listname)}(${itemId})`;
    const resDigest = await http.post("/_api/contextinfo");
    setXRequestDigest(resDigest.data.d.GetContextWebInformation.FormDigestValue);

    const response = await http.post(requestUrl, null, {
      headers: {
        "X-HTTP-Method": "DELETE",
        "If-Match": "*"
      }
    }
    );
    // var requestUrl =
    //   SPRESTPATH.replace("{listName}", listname) + "(" + itemId + ")";
    // const resDigest = await http.post("/_api/contextinfo", null, {
    //   headers: { Accept: "application/json; odata=verbose" }
    // });
    // const digest = resDigest.data.d.GetContextWebInformation.FormDigestValue;
    // const response = await http({
    //   url: requestUrl,
    //   method: "POST",
    //   contentType: "application/json;odata=verbose",
    //   headers: {
    //     Accept: "application/json; odata=verbose",
    //     "X-RequestDigest": digest,
    //     "X-HTTP-Method": "DELETE",
    //     "If-Match": "*"
    //   }
    // });
    return response;
  }

  // Emails a user
  async email(from, to, body, subject) {
    const requestUrl = "_api/SP.Utilities.Utility.SendEmail";
    const emailData = JSON.stringify({
      // var requestUrl = "_api/SP.Utilities.Utility.SendEmail";
      // return this.getFormDigest().then(response => {
      //   var digest = response.data.d.GetContextWebInformation.FormDigestValue;
      //   return http({
      //     method: "POST",
      //     url: requestUrl,
      //     data: JSON.stringify({
      properties: {
        __metadata: {
          type: "SP.Utilities.EmailProperties"
        },
        From: from,
        To: {
          results: to
        },
        Body: body,
        Subject: subject
      }
    });
    return this.getFormDigest().then(response => {
      const digest = response.data.d.GetContextWebInformation.FormDigestValue;
      setXRequestDigest(digest);

      return http.post(requestUrl, emailData).then(() => {
        //   headers: {
        //     "X-RequestDigest": digest
        //   }
        // }).then(() => {
        console.log("Email sent successfully");
      });
    });
  }

  // Uploads file to SharePoint
  async fileUpload(serverRelativeUrlToFolder, arrayBuffer, fileName) {
    const response = await this.addFileToFolder(
      arrayBuffer,
      serverRelativeUrlToFolder,
      fileName
    );

    getListItem(response.d.ListItemAllFields.__deferred.uri).then(res => {
      updateListItem(res.__metadata).then(() => {
        console.log("File uploaded and updated");
      });
    });

    return response;

    // Get the list item that corresponds to the file by calling the file's ListItemAllFields property.
    function getListItem(fileListItemUri) {
      // Send the request and return the response.
      return http({
        url: fileListItemUri,
        method: "GET",
        headers: {
          accept: "application/json;odata=verbose"
        }
      })
        .then(response => {
          return response.data.d;
        })
        .catch(er => {
          console.error("Something went wrong: " + er);
        });
    }

    // Change the display name and title of the list item.
    function updateListItem(itemMetadata) {
      // Define the list item changes. Use the FileLeafRef property to change the display name.
      // For simplicity, also use the name as the title.
      // The example gets the list item type from the item's metadata, but you can also get it from the
      // ListItemEntityTypeFullName property of the list.
      //var body = JSON.stringify("{{'__metadata':{{'type':'" + itemMetadata.type + "'}},'FileLeafRef':'" + fileName + "','Title':'" + fileName + "'}}";

      let body = JSON.stringify({
        __metadata: {
          type: itemMetadata.type
        },
        FileLeafRef: fileName,
        Title: fileName
      });

      // Send the request and return the promise.
      // This call does not return response content from the server.
      return http({
        url: itemMetadata.uri,
        method: "POST",
        data: body,
        headers: {
          "X-RequestDigest": XDIGEST,
          "content-type": "application/json;odata=verbose",
          "IF-MATCH": itemMetadata.etag,
          "X-HTTP-Method": "MERGE"
        }
      })
        .then(response => {
          return response;
        })
        .catch(er => {
          console.error("Something went wrong: " + er);
        });
    }
  }

  // Add the file to the file collection in the Shared Documents folder.
  async addFileToFolder(arrayBuffer, serverRelativeUrlToFolder, fileName) {
    // Construct the endpoint
    let fileCollectionEndpoint =
      "_api/web/getfolderbyserverrelativeurl('" +
      serverRelativeUrlToFolder +
      "')/files/add(overwrite=true, url='" +
      fileName +
      "')";

    return this.getFormDigest().then(response => {
      XDIGEST = response.data.d.GetContextWebInformation.FormDigestValue;

      return http({
        url: fileCollectionEndpoint,
        data: arrayBuffer,
        processData: false,
        method: "POST",
        headers: {
          accept: "application/json;odata=verbose",
          "Content-Type": undefined,
          "X-RequestDigest": XDIGEST
        }
      })
        .then(response => {
          return response.data;
        })
        .catch(er => {
          console.error("Something went wrong: " + er);
        });
    });
  }

  // Gets form digest for certain API calls
  async getFormDigest() {
    let requestUrl = "_api/contextinfo";
    const response = await http.post(requestUrl);
    return response;
  }
}
export default new SharePointService();