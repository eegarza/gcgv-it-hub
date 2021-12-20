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
    return linksArray;
  }

  transformItem(item) {
    return {
      backgroundImage: item.BackgroundImageLocation ? item.BackgroundImageLocation.Description : "",
      backgroundImageURL: item.BackgroundImageLocation ? item.BackgroundImageLocation.Url : "",
      description: item.Description,
      title: item.Title,
      order: item.TileOrder,
      target: item.LaunchBehavior==="New tab"?"_blank":undefined,
      linkURL: item.LinkLocation? item.LinkLocation.Url: "",
      linkDescription: item.LinkLocation? item.LinkLocation.Description: ""
    };
  }

}

export default new SPLinks();