module.exports = class extends think.Mongo {
  addUser(userInfo) {
    return this.thenUpdate({
      openid: userInfo.openid,
      unionid: userInfo.unionid,
      country: userInfo.country,
      province: userInfo.province,
      city: userInfo.city,
      language: userInfo.language,
      nickName: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
      gender: userInfo.gender,
      flg_delete: false,
      create_at: Date.now(),
      update_at: Date.now(),
      lastlogin_at: Date.now()
    }, {
      openid: userInfo.openid
    });
  }
  getUser(openid) {
    return this.where({
      openid
    }).find({
      field: 'nickName,avatarUrl,country,province,city,gender,language'
    });
  }
};
