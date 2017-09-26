$(function(){
	$.get('songs.json').then(function(response){
		let items = response
		items.forEach((i)=>{
			let $li = $(
				'<li>\
				<a href="song.html?id='+i.id+'">\
				<h3>'+i.name+'</h3>\
				<p>\
				<svg class="icon-sq"><use xlink:href="#icon-sq"></use></svg>'+i.singer+'-'+i.album+'\
				</p>\
					<svg class="icon-play"><use xlink:href="#icon-play"></use></svg>\
					</a>\
				</li>'
			)
			$('#newMusicLists').append($li)
		})
		$('.loading').remove()
	})
//tab切换
$('.homePage nav').on('click','ul.tabItems > li',function(e){
	let $li = $(e.currentTarget).addClass('active')
	$li.siblings().removeClass('active')
	let index = $li.index()
	$li.trigger('tabChange',index) //自定义 监听index
	$('.tabContent>li').eq(index).addClass('active')
		.siblings().removeClass('active')
})

$('nav').on('tabChange',function(e,index){
	if(index === 1){
		if($('.tabContent>li').eq(index).attr('data-downloaded') === 'yes'){
			return
		}
		$.get('songs.json').then((response)=>{
			/**/
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
			$('#hotMusicLists').append($li)
			if(i.id < 4){
				$('.musicOrder span').css('color','#df3436')
			}
		})
		$('.loading').remove()
			/**/
			$('.tabContent>li').eq(index).attr('data-downloaded','yes')
		})
	}	
})
//搜索
let timer = undefined
$('#searchSong').on('input',function(e){
	let $input = $(e.currentTarget)// 得到input元素
	let value = $input.val().trim()
	if (value === ''){return}
	if(timer){
		clearTimeout(timer)
	}

	timer = setTimeout(function(){
		search(value).then((result)=>{
			timer = undefined
			if(result.length !== 0){
				$('.output').html(`
        <svg class="icon-search"><use xlink:href="#icon-search"></use></svg>
        <a href="song.html?id=${result.map((r)=>r.id).join(',')}">
        <span>${result.map((r)=>r.name).join(',')}</span>
        </a>
					`)	
			}else{
				$('.output').text('没有结果')
			}
		})
	},1000)
})
function search(keyword){
	return new Promise((resolve,reject)=>{
		var database = [
			{"id":"1","name": "红玫瑰",},
			{"id":"2","name": "淘汰",},
			{"id":"3","name": "富士山下",},
			{"id":"4","name": "好久不见",},
			{"id":"5","name": "不要说话",},
			{"id":"6","name": "最佳损友",},
			{"id":"7","name": "爱情转移",},
			{"id":"8","name": "浮夸",},
			{"id":"9","name": "白玫瑰",},
			{"id":"10","name": "爱情转移",},
		]
		let result = database.filter(function(item){
			return item.name.indexOf(keyword)>=0
		})			
		setTimeout(function(){
			resolve(result)
		},(Math.random()*200 + 1000))
	})
}
$('#searchSong').on('input',function(){
	if($('#searchSong').val() === ''){
		$('section.hotSearch').show()
		$('section.result').addClass('active')
	}else{
		$('section.hotSearch').hide()
		$('section.result').removeClass('active')
		$('section.result .show').text('搜索：' + $('#searchSong').val())
	}
})
})
