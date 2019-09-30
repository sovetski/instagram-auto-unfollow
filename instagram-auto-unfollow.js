/* Informations client et html */
var auto_unfollow_time = 3000;
var url = window.location.href; /* charger URL */
var username = url.split("/")[3]; /* charger url de utilisateur */

var followers_button = "a[href='/"+username+"/followers/']"; /* bouton des Abonnes */
var followers_list_class = "._4gt3b"; /* Class de div de bouton des Abonnes */
var followers_count_class = "._bkw5z"; /* Class de nombre des Abonnes */
var followers_count = $(followers_button + " " + followers_count_class).text(); /* nombre des Abonnes */

var following_button = "a[href='/"+username+"/following/']"; /* bouton des ABOS */
var following_list_class = "._4gt3b"; /* Class de div de bouton des ABOS */
var following_count_class = "._bkw5z"; /* Class de nombre des ABOS */
var following_count = $(following_button + " " + following_count_class).text(); /* nombre des ABOS  */

var following_modal_title_class = "._q44m8"; /* Class de modal des ABOS */

var modal_users_ul_li = followers_list_class + " ul:first-child li";  /* les LIs de premier UL */

var followers_order_array = {};  /* ordre des abonnes dans array */
var followers_name_array = {};  /* noms des abonnes dans array */

function create_followers_array()
{
/* Creer une array pour ceux qui nous suivent */
for(var i=0;i<=$(modal_users_ul_li).length;i++)
{
followers_order_array[i] = $(modal_users_ul_li +":eq("+i+") a").text();  /* ajouter un nombre dans array (par rapport aux LI) pour tous les abonnes */
followers_name_array[followers_order_array[i]] = followers_order_array[i];  /* Ajouter un nom de utilisateur bass sur le element li de chaque ligne */
}
}

function is_user_follow_me(username_value)
{
/* Analyser si le utilisateur que je suis est dans mes abonnes */
if(!(username_value in followers_name_array)) {
$("a[href='/"+username_value+"/']").parents().eq(4).find("button").not("._2hpcs")[0].click(); /* unfollow ce qui me suient pas (avec point not on empeche de reclicker sur abonner) */
$("a[href='/"+username_value+"/']").append("<font color='red'>	✖ unfollowed</font>"); /* afficher les unfollowed */
$("#unfollowed_users_count").text(parseInt($("#unfollowed_users_count").text()) + parseInt(1)); /* mettre a jour le nombre des unfollowed */
}else{
$("a[href='/"+username_value+"/']").append("<font color='green'> ✔ is following you</font>"); /* afficher mes abonnes */
}
}

function unfollow_all_non_followers()
{
var i = 0;
var counter_interval = setInterval(function(){
is_user_follow_me($(modal_users_ul_li +":eq("+i+") a").text());
i++;
if(i > $(modal_users_ul_li).length) {
	clearInterval(counter_interval);
	alert("Finished ! Total : " + $("#unfollowed_users_count").text() + " unfollowed users");
}
}, auto_unfollow_time);
}

function step1(){
/* Cliquer sur le bouton abonnees */
$(followers_button)[0].click();
var followers_scroll_interval = setInterval(function(){
var followers_list = $(followers_list_class);
followers_list.scrollTop(followers_list.prop("scrollHeight"));
if($(modal_users_ul_li).length >= followers_count) {
clearInterval(followers_scroll_interval); /* nettoyer interval */
create_followers_array(); /* creer array des abonnees */
step2(); /* passer a letape suivant */
}
},100);
}

function step2(){
/* Cliquer sur le bouton ABOS */
$(following_button)[0].click();
var following_scroll_interval = setInterval(function(){
var following_list = $(following_list_class);
following_list.scrollTop(following_list.prop("scrollHeight"));
if($(modal_users_ul_li).length >= following_count) {
clearInterval(following_scroll_interval); /* nettoyer interval */
following_list.scrollTop(0); /* mettre le Scroll tout en haut */
$(following_modal_title_class).append("<font color='red'> <span id='unfollowed_users_count'>0</span> unfollowed</font>"); /* afficher total unfollowed */
unfollow_all_non_followers(); /* apeller le fonction de auto unfollow */
}
},100);
}

function start(){
step1();
}

start();
