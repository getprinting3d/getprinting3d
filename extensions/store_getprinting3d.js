/* **************************************************************

   Copyright 2013 Zoovy, Inc.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

************************************************************** */



//    !!! ->   TODO: replace 'username' in the line below with the merchants username.     <- !!!

var store_getprinting3d = function() {
	var theseTemplates = new Array('');
	var r = {


////////////////////////////////////   CALLBACKS    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\



	callbacks : {
//executed when extension is loaded. should include any validation that needs to occur.
		init : {
			onSuccess : function()	{
				var r = false; //return false if extension won't load for some reason (account config, dependencies, etc).

				//if there is any functionality required for this extension to load, put it here. such as a check for async google, the FB object, etc. return false if dependencies are not present. don't check for other extensions.
				r = true;

				return r;
				},
			onError : function()	{
//errors will get reported for this callback as part of the extensions loading.  This is here for extra error handling purposes.
//you may or may not need it.
				app.u.dump('BEGIN admin_orders.callbacks.init.onError');
				}
			}
		}, //callbacks



////////////////////////////////////   ACTION    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//actions are functions triggered by a user interaction, such as a click/tap.
//these are going the way of the do do, in favor of app events. new extensions should have few (if any) actions.
		a : {
			showDropDownClick : function($tag){
				//app.u.dump('showClick');
				if(this.showDropDown($tag)){
				$('.dropdown',$tag).unbind('click');
				$('.dropdown',$tag).click(function(event){event.stopPropagation()});
				$tag.attr('onClick','').unbind('click');
				setTimeout(function(){$('body').click(function(){
				app.ext.store_getprinting3d.a.hideDropDownClick($tag);
				});}, 500);
				}
			},

			hideDropDown : function ($tag) {
				//app.u.dump('hiding');
				$(".dropdown", $tag).stop().animate({"height":"0px"}, 500);
				if($tag.data('timeout') && $tag.data('timeout')!== "false"){
				$tag.data('timeout')
				$tag.data('timeout','false');
				}
				$tag.data('timeout',setTimeout(function(){$(".dropdown", $tag).hide();},500));
				return true;
			},

			hideDropDownClick : function($tag){
				//app.u.dump('hideClick');
				if(this.hideDropDown($tag)){
				$tag.click(function(){app.ext.store_getprinting3d.a.showDropDownClick($(this));});
				$('body').unbind('click');
				}
			},

			hideDropDownOnSelect : function($tag){
			this.hideDropDown($tag);
			$tag.data('timeoutNoShow', setTimeout(function(){$tag.data('timeoutNoShow', 'false');}, 500));
			}
			
			}, //Actions

////////////////////////////////////   RENDERFORMATS    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//renderFormats are what is used to actually output data.
//on a data-bind, format: is equal to a renderformat. extension: tells the rendering engine where to look for the renderFormat.
//that way, two render formats named the same (but in different extensions) don't overwrite each other.
		renderFormats : {

			}, //renderFormats
////////////////////////////////////   UTIL [u]   \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//utilities are typically functions that are exected by an event or action.
//any functions that are recycled should be here.
		u : {
			}, //u [utilities]

//app-events are added to an element through data-app-event="extensionName|functionName"
//right now, these are not fully supported, but they will be going forward. 
//they're used heavily in the admin.html file.
//while no naming convention is stricly forced, 
//when adding an event, be sure to do off('click.appEventName') and then on('click.appEventName') to ensure the same event is not double-added if app events were to get run again over the same template.
		e : {
			} //e [app Events]
		} //r object.
	return r;
	}