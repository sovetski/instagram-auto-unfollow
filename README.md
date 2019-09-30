# instagram-auto-unfollow
Instagram auto unfollow

1. Download Firebug for FireFox : http://getfirebug.com/
2. Go to your instagram account with url (ex : instagram.com/yourusername)
3. Open Firebug
4. Paste "allow pasting" -> double Enter, and this code in console :
```jquery
/* Jquery - Start */

var jq = document.createElement('script');

jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";

document.getElementsByTagName('head')[0].appendChild(jq);

/* Jquery charge */

jQuery.noConflict();

/* Jquery END */
```
5. Enter :)
6. After that, paste instagram-auto-infollow.js codes
7. Enter :)

# Changing time to unfollowing

you can change the value of variable auto_unfollow_time, default is 3000 millisecond ( 3 sec )
