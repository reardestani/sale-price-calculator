@import '../../node_modules/jquery/dist/jquery.slim.min.js';
@import '../../node_modules/tippy.js/dist/tippy.min.js';

$( 'body' ).append( `<div id="template" style="display: none;">محاسبه ...</div>` );

$( document ).ready(function() {

	function findChild( $element, child ) {
		var text = $element.children().eq( child ).find( 'p' ).text();
		return Number( text.replace( /,/g, '' ) );
	}
	
	// Thanks to https://codepen.io/shaikmaqsood/pen/XmydxJ/
	function copyToClipboard( element ) {
		var $temp = $("<input>");
		$("body").append($temp);
		$temp.val( $.trim( $(element).text() ) ).select();
		document.execCommand("copy");
		$temp.remove();
	}
	
	function getdata( element ) {
		const $element = $( element );
		const RemainingQuantity = findChild( $element, 2 );
		const AveragePrice = findChild( $element, 4 );
		const BuyTotalTradeVolume = findChild( $element, 5 );
		const BreakPointSalesByAvaragePrice = findChild( $element, 6 );
		
		return [
			RemainingQuantity,
			AveragePrice,
			BuyTotalTradeVolume,
			BreakPointSalesByAvaragePrice
		]
	}
	
	function calculatePrice( data, percent ) {
		let RemainingQuantity = data[0];
		let AveragePrice = data[1];
		let BuyTotalTradeVolume = data[2];
		let BreakPointSalesByAvaragePrice = data[3];
		let price;
		
		// 1
		BuyTotalTradeVlolum = BuyTotalTradeVolume + ( BuyTotalTradeVolume / ( 100 / percent ) );
		
		// 2
		price = BreakPointSalesByAvaragePrice - AveragePrice;
		price += Math.round( BuyTotalTradeVlolum / RemainingQuantity );
		
		return price;
	}
	
	function calculateProfit( data, tableTotal ) {
		let BuyTotalTradeVolume = data[2];
		let profit;

		profit = tableTotal - BuyTotalTradeVolume 

		return Math.round( profit );
	}
	
	function calculateTotal( data, tablePrice ) {
		let RemainingQuantity = data[0];
		let total;

		total = RemainingQuantity * tablePrice
		total = total - ( total / 99.8 )

		return Math.round( total );
	}

	setTimeout( function() {

		const tip = tippy('.container-4 .x-grid-row', {
			trigger: 'click',
			interactive: true,
			interactiveBorder: 15,
			distance: 1,
			animation: 'perspective',
			animateFill: false,
			html: '#template',
			onShow() {
				const content = this.querySelector('.tippy-tooltip-content')
				const element = tip.getReferenceElement( this )
				let percentStart = 0
				let percentEnd = 3
				let percentStep = 0.25
				let data = getdata( element )
				let tablePrice
				let tableProfit
				let tableTotal

				let table = `<table class="spc-table"><tr>
					<th>درصد</td>
					<th>قیمت</td>
					<th>سود</td>
					<th>جمع کل</td>
				</tr>`

				for (percent = percentStart; percent <= percentEnd; percent += percentStep) {
					tablePrice = calculatePrice( data, percent )
					tableTotal = calculateTotal( data, tablePrice )
					tableProfit = calculateProfit( data, tableTotal )
					
					table += `<tr>
						<td class="spc-percent">${ percent }%</td>
						<td class="spc-price" title="Sell with this price">${ tablePrice.toLocaleString() }</td>
						<td class="spc-profit">${ tableProfit.toLocaleString() }</td>
						<td class="spc-total">${ tableTotal.toLocaleString() }</td>
					</tr>`
				}

				table += `</table>`;

				content.innerHTML = table
				tip.loading = false
			}
		});

	}, 4000 );

	$( document ).on( 'click', '.spc-price', function() {
		copyToClipboard( this );
	} );

});

// 	
// 	
// 	
// // 
// // var percent2 = 1.5;
// // 
// // 
// // // 
// // 	run();
// // 	
// // 	// var observer = new MutationObserver(function(mutation) {  
// // 	// 	console.log(mutation);
// // 	// 	run(); 
// // 	// })
// // 	// 
// // 	// var observerConfig = {  
// // 	// 	attributes: true,
// // 	// 	childList: true,
// // 	// 	attributeOldValue: true,
// // 	// 	characterData: true
// // 	// }
// // 	
// // 	// const tableRows = $( '.container-4' ).eq(1).children().find( '.col-p' );
// // 	// 
// // 	// for (i = 0; i < tableRows.length; i++)  
// // 	// {
// // 	//   observer.observe(tableRows[i], observerConfig);
// // 	// }
// // 
// 
// 
// // $( '.container-4' ).eq(1).children().on( "mouseenter", function() {
// // 	console.log( 989 );
// // 	run();
// // });
// // 
// // 
// 
// 
// 
// 
// // setInterval( function() {
// // 	console.log( 'interval' );
// // 	run();
// // }, 2000 );
// 
// 
// 
// // 
// // 
// // 
// // function run() {
// // 	console.log("something happening from the extension");
// // 	
// // 	if ( ! $( '.container-4' ).eq(1).children() ) {
// // 		return;
// // 	}
// // 

// // 	
// // 	// Thanks to https://codepen.io/shaikmaqsood/pen/XmydxJ/
// // 	function copyToClipboard(element) {
// // 		var $temp = $("<input>");
// // 		$("body").append($temp);
// // 		$temp.val( $.trim( $(element).text() ) ).select();
// // 		document.execCommand("copy");
// // 		$temp.remove();
// // 	}
// // 
// // 	

// // 	
// // 	const portfolio = $( '.container-4' ).eq(1).children();
// // 
// // 	
// // 	$.each(portfolio, function(index, stock) {
// // 
// // 		let value = [];
// // 		value.push( findChild( stock, 5 ) );
// // 		value.push( findChild( stock, 2 ) );
// // 		value.push( findChild( stock, 6 ) );
// // 		value.push( findChild( stock, 4 ) );
// // 
// // 		$( stock ).children().eq( 6 ).addClass( 'ra-flex' ).find( '.ra-sale-wrap' ).remove();
// // 
// // 		$( stock ).children().eq( 6 ).append( '<div class="ra-sale-wrap"><span class="ra-sale-price-percent">' + percent2 + '%</span><span class="ra-sale-price" title="Click to copy to clipboard"> ' + calcprice( value, percent2 ) + '</span></div>' );
// // 		
// // 		// $( stock ).children().eq( 6 ).append( `
// // 		// 	<table id="demoTable" class="table">
// // 		// 		<tbody>
// // 		// 			<tr>
// // 		// 				<td id="reza">1</td>
// // 		// 				<td>todd@localhost</td>
// // 		// 			</tr>
// // 		// 		</tbody>
// // 		// 	</table>
// // 		// `);
// // 	});
// // 	
// // 	$( document ).on( 'click', '.ra-sale-price', function( e ) {
// // 		copyToClipboard( $( this ) );
// // 
// // 		e.stopImmediatePropagation();
// // 
// // 		$( this ).parent().parent().siblings( '.controls' ).find( '.menu-sell' ).trigger( 'click' );
// // 	} )
// // 	
// // 	// console.log( portfolio.childnodes );
// // 	
// // 	// var data = percent2 || {};
// // 	// 
// // 	// var linksList = document.querySelectorAll('a');
// // 	// [].forEach.call(linksList, function(header) {
// // 	//     header.innerHTML = percent2;
// // 	// });
// // 	// sendResponse({data: data, success: true});
// // // 
// // 
// // }
// // 
// // // chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
// // // });
// 
