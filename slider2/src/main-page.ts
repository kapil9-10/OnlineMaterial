import { ScrollEventData, ScrollView, View, PanGestureEventData, ActivityIndicator } from '@nativescript/core';
/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { EventData, Page } from '@nativescript/core';
import { HelloWorldModel } from './main-view-model';

let page: Page
let visibleView = [0]
// Event handler for Page 'navigatingTo' event attached in main-page.xml
export function navigatingTo(args: EventData) {

	page = <Page>args.object;
	page.actionBarHidden = true
	page.bindingContext = new HelloWorldModel();
}
export function onScroll(args: ScrollEventData) {
	const scroll = args.object as ScrollView
	const verticalOffset = scroll.verticalOffset
	const height = scroll.getActualSize().height
	const VisibleArea = height + verticalOffset
	const container = page.getViewById('container') as View
	visibleView = []
	let index = 0
	container.eachChildView((childView: View) => {
		const LocationY = childView.getLocationRelativeTo(container).y
		if (LocationY >= verticalOffset && LocationY <= VisibleArea) {
			visibleView.push(index)
		}
		index++
		return true
	})
	console.log(visibleView)
}


export function onPen(args: PanGestureEventData) {
	//state==2 when you move finder on screen
	// state==3 when you lift you finger
	if (visibleView.indexOf(0) !== -1) {
		const drag = page.getViewById('drag') as View
		const spinner = page.getViewById('loading') as ActivityIndicator
		if (args.state == 2) {
			if (args.deltaY <= 100 && args.deltaY>=0) {
				drag.marginTop = Math.round(args.deltaY) + 80
			} else if (args.deltaY > 100) {
				spinner.busy = true
				console.log(spinner.busy)
				drag.marginTop = 100 + 80
			}
		}
		if (args.state === 3) {
			drag.marginTop = 80
			spinner.busy = false
		}
	}
}


