$(function(){
	let id = parseInt(location.search.match(/\bid=([^&]*)/)[1],10)
	$.get('songs.json').then(function(response){
		let songs = response
		let song = songs.filter(s=>s.id == id)[0]
		let {url,name,singer,lyric,cover,background} = song


		initPlayer.call(undefined,url) //播放函数

		initInformation(name,singer,lyric,cover,background)
		 	
		})		

function initPlayer(url){
			let audio = document.createElement('audio')
			audio.src =url
			audio.oncanplay = function(){
				audio.play()
				$('.disc-container').addClass('play')
				
			}
			//暂停恢复
			$('.disc-container .icon-pause').on('click',function(){
				audio.pause()
				$('.disc-container').removeClass('play')
			})
			$('.disc-container .icon-play').on('click',function(){
				audio.play()
				$('.disc-container').addClass('play')
			})	
			setInterval(()=>{
				let seconds = audio.currentTime
				let munites = ~~(seconds / 60)
				let left = seconds - munites * 60
				let time = `${pad(munites)}:${pad(left)}`
				let $lyric = $('.lyric > p')
				let $whichLine
				for (let i=0;i<$lyric.length;i++){
					let currentTime = $lyric.eq(i).attr('data-time')
					let nextLineTime = $lyric.eq(i+1).attr('data-time')
					if ($lyric[i+1] !== undefined && currentTime < time && nextLineTime > time){
						$whichLine = $lyric.eq(i)
					} 
				}
				if($whichLine){
					$whichLine.addClass('active').prev().removeClass('active')
					let top = $whichLine.offset().top
					let lineTop = $('.lyric').offset().top
					let delta = top - lineTop - $('.lyric-box').height()/3
					$('.lyric').css('transform',`translateY(-${delta}px)`)
				}
			},300)
}

function pad(number){
	return number>=10 ? number + '' : '0' + number
}
function initInformation(name,singer,lyric,cover,background){
	$('.song-description h2').html(name+'-'+'<span>'+singer+'</span>' )
	$('.disc-container .cover').attr('src',cover)
	$('.page').css({
		background:'url('+background+')',
		'background-size': 'cover'
		})
	paseLyric(lyric)
	}
function paseLyric(lyric){
	let array = lyric.split('\n')
	let regex = /^\[(.+)\](.*)$/
	array = array.map(function(string){
		let matches = string.match(regex)
		if(matches){
			return {time: matches[1],words: matches[2]}
		}
	})
	let $lyric = $('.lyric')
	array.map(function(object){
		if(!object){return}
		let $p = $('<p/>')
		$p.attr('data-time',object.time).text(object.words)
		$p.appendTo($lyric)
	})
}	
})  










/*


	//获取歌词
	$.get('songs.json').then(function(object){

		let lyric = object.lyric
		let array = lyric.split('\n')
		let regex = /^\[(.+)\](.*)$/
		array = array.map(function(string){
			let matches = string.match(regex)
			if(matches){
				return {time: matches[1],words: matches[2]}
			}
		})
		let $lyric = $('.lyric')
		array.map(function(object){
			if(!object){return}
			let $p = $('<p/>')
			$p.attr('data-time',object.item).text(object.words)
			$p.appendTo($lyric)
		})
	})
	//播放
 	let audio = document.createElement('audio')
	audio.src =object.url
	audio.oncanplay = function(){
		audio.play()
		$('.disc-container').addClass('play')
		
	}
	//暂停恢复
	$('.disc-container .icon-pause').on('click',function(){
		audio.pause()
		$('.disc-container').removeClass('play')
	})
	$('.disc-container .icon-play').on('click',function(){
		audio.play()
		$('.disc-container').addClass('play')
	})	
})
*/