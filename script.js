$(document).ready(function(){
    if('serviceWorker' in navigator){
        navigator.serviceWorker.register('./sw.js')
        .then(res => console.log('Registrado correctamente', res))
        .catch(err => console.log('Service Worker Error', err))
    }else{
        console.log('bai');
    }
    /*Scroll savizado */
    $("menu a").click(function(e){
        e.preventDefault();
        $("html body").animate({
            scrollTop: $($(this).attr('href')).offset().top
        });
        return false;
    })
})