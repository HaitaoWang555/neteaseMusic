$ (function(){
	$('.introductionWrap').on('click',function(){
			$('.introduction').toggleClass('active')
			$('.introductionWrap img').toggleClass('active')	
	})
	$.get('songs.json').then((response)=>{
		let items = response
		items.forEach((i)=>{
			let $li = $(`
				<a href="song.html?id=${i.id}">	
				<li>
				<div class="musicOrder">  
				<span>${i.id}</span>
				</div>
				<div>
				<h3>${i.name}</h3>
				<p>
				<svg class="icon-sq"><use xlink:href="#icon-sq"></use></svg>${i.singer}-${i.album}
				</p>
				<svg class="icon-play"><use xlink:href="#icon-play"></use></svg>
				</div>				
				</li>
				</a>
			`)
			$('#myMusicLists').append($li)
		})

	})
})
