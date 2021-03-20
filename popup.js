(function (window) {
	console.log('这是一个demo in func', chrome)
	document.getElementById('btn').addEventListener('click', () => {
		chrome.storage.sync.get('m3u8List', function(data) {
			console.log('chrome.storage.sync.get', data)
			if (data.m3u8List) {
				const m3u8Json = {
					urls: data.m3u8List
				}
				var file = new File([JSON.stringify(m3u8Json)], "msu8.json", {type: "application/json"});
				saveAs(file)
			}
		})
	}, false)
})(window)