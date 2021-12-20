import http from './http-sp-common'

// Default SP13 REST path
const SPRESTPATH = '_vti_bin/ListData.svc/'
let XDIGEST = ''

class SharePointService {

  // Get current user's details
  async userGet() {
    var requestUrl = '_api/sp.userprofiles.peoplemanager/getmyproperties'
    const response = await http.get(requestUrl)
    return response.data.d
  }

  // Get user's Id - used when populating user columns
  async userGetId(userName) {
    var prefix = 'i:0#.w|'
    var accountName = prefix + userName
    var requestUrl = "_api/web/siteusers(@v)?@v='" +
      encodeURIComponent(accountName) + "'"
    const response = await http.get(requestUrl)
    return response.data.d
  }

  // Returns an object with all user's details
  async userGetDetailAndId() {
    let userData, userId
    return this.userGet().then((response) => {
      userData = response
      return this.userGetId(userData.AccountName).then(function (response) {
        userId = response
        return {
          'userData': userData,
          'userId': userId
        }
      })
    })
  }

  // Typehead search for SP
  async userSearch(term) {
    var requestUrl = '_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser'
    return this.getFormDigest().then((response) => {
      var digest = response.data.d.GetContextWebInformation.FormDigestValue
      var data = JSON.stringify({
        'queryParams': {
          '__metadata': {
            'type': 'SP.UI.ApplicationPages.ClientPeoplePickerQueryParameters'
          },
          'AllowEmailAddresses': true,
          'AllowMultipleEntities': false,
          'AllUrlZones': false,
          'MaximumEntitySuggestions': 50,
          'PrincipalSource': 15,
          'PrincipalType': 1,
          'QueryString': term
        }
      })
      return http({
        'method': 'POST',
        'data': data,
        'url': requestUrl,
        'headers': {
          'X-RequestDigest': digest
        }
      }).then((response) => {
        console.log('User search performed')
        return response.data.d
      })
    })
  }

  // Gets a list from SP
  async get(listname) {
    var requestUrl = SPRESTPATH + listname
    const response = await http.get(requestUrl)
    return response.data.d.results
  }

  // Gets a list with filter
  async getWithFilter(listname, filter) {
    var requestUrl = SPRESTPATH + listname + filter
    const response = await http.get(requestUrl)
    return response.data.d.results
  }

  // Posts to a list
  async post(listname, payload) {
    var requestUrl = SPRESTPATH + listname
    const response = await http.post(requestUrl, payload)
    return response.data
  }

  // Updates list item
  async update(metadata, data) {
    const response = await http({
      'url': metadata.uri,
      'method': 'MERGE',
      'data': data,
      'headers': {
        'If-Match': '*'
      }
    })
    return response.data
  }

  // Delete list item
  async del(list, id, obj) {
    var requestUrl = SPRESTPATH + list + '(' + id + ')'
    var accessType = 'Microsoft.SharePoint.DataService.' + list + 'Item'
    obj.__metadata = {
      'type': accessType
    }
    const response = await http({
      'method': 'DELETE',
      'url': requestUrl,
      'data': JSON.stringify(obj),
      'beforeSend': function (request) {
        request.setRequestHeader('If-match', '*')
      }
    })
    return response
  }

  // Emails a user
  async email(from, to, body, subject) {
    var requestUrl = '_api/SP.Utilities.Utility.SendEmail'
    return this.getFormDigest().then((response) => {
      var digest = response.data.d.GetContextWebInformation.FormDigestValue
      return http({
        'method': 'POST',
        'url': requestUrl,
        'data': JSON.stringify({
          'properties': {
            '__metadata': {
              'type': 'SP.Utilities.EmailProperties'
            },
            'From': from,
            'To': {
              'results': to
            },
            'Body': body,
            'Subject': subject
          }
        }),
        'headers': {
          'X-RequestDigest': digest
        }
      }).then(() => {
        console.log('Email sent successfully')
      })
    })
  }

  // Uploads file to SharePoint
  async fileUpload(serverRelativeUrlToFolder, arrayBuffer, fileName) {

    const response = await this.addFileToFolder(arrayBuffer, serverRelativeUrlToFolder, fileName)

    getListItem(response.d.ListItemAllFields.__deferred.uri).then((res) => {

      updateListItem(res.__metadata).then(() => {
        console.log('File uploaded and updated')
      });

    })

    return response

    // Get the list item that corresponds to the file by calling the file's ListItemAllFields property.
    function getListItem(fileListItemUri) {

      // Send the request and return the response.
      return http({
        'url': fileListItemUri,
        'method': "GET",
        'headers': {
          "accept": "application/json;odata=verbose"
        }
      }).then((response) => {
        return response.data.d
      }).catch((er) => {
        console.log('Something went wrong: ' + er)
      })
    }

    // Change the display name and title of the list item.
    function updateListItem(itemMetadata) {

      // Define the list item changes. Use the FileLeafRef property to change the display name.
      // For simplicity, also use the name as the title.
      // The example gets the list item type from the item's metadata, but you can also get it from the
      // ListItemEntityTypeFullName property of the list.
      //var body = JSON.stringify("{{'__metadata':{{'type':'" + itemMetadata.type + "'}},'FileLeafRef':'" + fileName + "','Title':'" + fileName + "'}}";

      let body = JSON.stringify({
        '__metadata': {
          'type': itemMetadata.type
        },
        'FileLeafRef': fileName,
        'Title': fileName
      })

      // Send the request and return the promise.
      // This call does not return response content from the server.
      return http({
        'url': itemMetadata.uri,
        'method': "POST",
        'data': body,
        'headers': {
          "X-RequestDigest": XDIGEST,
          "content-type": "application/json;odata=verbose",
          "IF-MATCH": itemMetadata.etag,
          "X-HTTP-Method": "MERGE"
        }
      }).then((response) => {
        return response;
      }).catch((er) => {
        console.log('Something went wrong: ' + er)
      })
    }
  }

  // Add the file to the file collection in the Shared Documents folder.
  async addFileToFolder(arrayBuffer, serverRelativeUrlToFolder, fileName) {

    // Construct the endpoint
    let fileCollectionEndpoint = "_api/web/getfolderbyserverrelativeurl('" + serverRelativeUrlToFolder + "')/files/add(overwrite=true, url='" + fileName + "')";

    return this.getFormDigest().then((response) => {

      XDIGEST = response.data.d.GetContextWebInformation.FormDigestValue

      return http({
        'url': fileCollectionEndpoint,
        'data': arrayBuffer,
        'processData': false,
        'method': "POST",
        'headers': {
          "accept": "application/json;odata=verbose",
          "Content-Type": undefined,
          "X-RequestDigest": XDIGEST
        }
      }).then((response) => {
        return response.data;
      }).catch((er) => {
        console.log('Something went wrong: ' + er)
      })

    });
  }


  // Gets form digest for certain API calls
  async getFormDigest() {

    var requestUrl = '_api/contextinfo'
    const response = await http.post(requestUrl)
    return response
  }
}
export default new SharePointService()