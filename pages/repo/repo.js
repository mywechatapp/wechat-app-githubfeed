import services from '../../utils/services';

Page({
  onLoad(options) {
    this.setData({
      repo_full_name: options.repo_full_name
    });
    
    this.fetchRepoData(this._reloadUrl());
  },

  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.repo_full_name
    });
  },

  _reloadUrl() {
    const basic_url = 'https://api.github.com/repos/';

    return basic_url + this.data.repo_full_name;
  },

  fetchRepoData(url) {
    this.showLoadingToast();
    services.fetch(url).then(res => {
      if (res.data) {
        this.setData({ repo: res.data });
        this.hideLoadingToast();
      }
    });
  },

  showLoadingToast() {
    wx.showToast({
      title: 'Loading',
      icon: 'loading', 
      duration: 10000
    });
  },

  hideLoadingToast() {
    wx.hideToast();
  }
});
