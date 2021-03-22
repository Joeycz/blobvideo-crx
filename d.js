const { exec } = require('child_process');
const { urls } = require('./msu8.json')
const async = require('async')

console.log(urls)

function download (urls, max) {
	async.timesLimit(urls.length, max, function(i, next) {
		const title = `${i}.${urls[i].tit}`.replace(/\s/g, '')
		exec(`ffmpeg -i ${urls[i].m3u8} -c copy -bsf:a aac_adtstoasc ${title}.mp4`, function (err, stdout, stderr) {
			console.log('Data processed for:' + `${title}` + ' starting...');
			if (err) {
				console.log(err)
				return;
			}
			console.log(`stdout: ${title} done!`);
			// console.log(`stderr: ${stderr}`);
			next(null, stdout)
		})
	}, function(err, stdoutArray) {
		console.log('all is done')
	})
}

download(urls, 3)
