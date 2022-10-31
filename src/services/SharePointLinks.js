import SharePointService from './SharePointService';
// import moment from 'moment';

const LinksList = "IT Service Request Links";

class SPLinks {

  async getCurrentUserID() {
    try {
      const user = await SharePointService.userGetDetailAndId();
      return { result: user.userId.Id };
    } catch (err) {
      return { error: err };
    }
  }

  async getUserSPID(lanID) {
    try {
      const user = await SharePointService.userGetId(lanID);
      return user.Id;
    } catch (err) {
      return { error: err };
    }
  }

  async getAllLinks() {
    let linksArray = [];
    let nextURL = await SharePointService.get(LinksList)
      .then(response => {
        response.results.map(item => {
          let linkItem = this.transformItem(item);
          linksArray.push(linkItem);
        })
        return response.__next;
      })
      .catch(er => console.log(er));
    while (nextURL) {
      nextURL = await SharePointService.getURL(nextURL)
        .then(response => {
          response.results.map(item => {
            let linkItem = this.transformItem(item);
            linksArray.push(linkItem);
          })
          return response.__next;
        })
    }
    // console.log('cowboys');
    // console.log(linksArray);
    // console.log('spurs');
    return linksArray;
  }

  transformItem(item) {
    return {
      backgroundImage: item.Background_x0020_Image_x0020_Loc.Description ? item.Background_x0020_Image_x0020_Loc.Description : "",
      backgroundImageURL: item.Background_x0020_Image_x0020_Loc.Url ? item.Background_x0020_Image_x0020_Loc.Url : "",
      description: item.Description,
      title: item.Title,
      order: item.Order0,
      target: item.Launch_x0020_Behavior==="New tab"?"_blank":undefined,
      linkURL: item.Link_x0020_Location.Url? item.Link_x0020_Location.Url: "",
      linkDescription: item.Link_x0020_Location.Description? item.Link_x0020_Location.Description: ""
    };
  }

}

export default new SPLinks();