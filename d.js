const { exec } = require('child_process');
const { urls } = require('./msu8.json')

console.log(urls)

function download (url, name) {
	console.log('download====>', url)
	exec(`ffmpeg -i ${url} -c copy -bsf:a aac_adtstoasc ${name}.mp4`, (err, stdout, stderr) => {
		if (err) {
			// node couldn't execute the command
			console.log(err)
			return;
		}
	
		// the *entire* stdout and stderr (buffered)
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	});
}

urls.forEach((url, index) => {
	download(url, 'course' + index)
})
