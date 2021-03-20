console.log('bg main js')
chrome.webRequest.onCompleted.addListener(
  function (details) {
		const m3u8Regx = new RegExp("^https?://.*\\.m3u8(?:\\?|$)")
		if (m3u8Regx.test(details.url)) {
			let m3u8List = []
			chrome.storage.sync.get('m3u8List', function(data) {
				console.log('chrome.storage.sync.get', data)
				if (data.m3u8List) {
					m3u8List = data.m3u8List
				}
				console.log(m3u8List)
				console.log('chrome.webRequest.onCompleted.addListener ===>', details.url)
				if (!m3u8List.includes(details.url)) {
					m3u8List.push(details.url)
					chrome.storage.sync.set({'m3u8List': m3u8List}, function() {
						// 通知保存完成。
						console.log('m3u8List 设置已保存');
					});
				}
			})
		}
    // if (details.statusCode == 200) {
    //   sendMessageTo("fillingPass", details.tabId, (e) => {
    //     console.log('查询已完成');
    //   })
    // }
  },
  { urls: ["<all_urls>"] }  //监听页面请求,你也可以通过*来匹配。
);