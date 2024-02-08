window.onload = function(){

    
    //모바일 메뉴 버튼
    let moMenuBtn = document.querySelector(".mo-menu-btn")
    let sideMenu = document.querySelector(".side-menu")
    let sideMenuList = document.querySelector(".side-menu ul")
    moMenuBtn.addEventListener("click",function(){
        sideMenu.classList.toggle("active")
        this.classList.toggle("active")
    })
    sideMenuList.addEventListener("click",function(){
        sideMenu.classList.toggle("active")
        moMenuBtn.classList.toggle("active")
    })
    window.addEventListener("resize",function(){
        let winWidth = window.innerWidth
        if(winWidth > 768){
            sideMenu.classList.remove("active")
            moMenuBtn.classList.remove("active")
        }

    })
    
    
    

    let header = document.querySelector(".header")
    window.addEventListener("scroll", function() {
        let scrollPosition = window.scrollY;
        let aobutSection = document.querySelector(".about").offsetTop;
        let workSection = document.querySelector(".portfolio").offsetTop;
        if (scrollPosition > aobutSection && scrollPosition < workSection) {
            header.classList.add("active")
        }else{
            header.classList.remove("active")
        }
    });
    document.addEventListener("scroll", function(){
        let scrollPosition = window.scrollY;
        let sectionItem = document.querySelectorAll("section");
        sectionItem.forEach(function(item){
            let sectionTop = item.offsetTop - 200;
            let sectionHeight = item.clientHeight;
    
            if(scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight){
                let sectionId = item.id
                document.querySelector(".header ul li.active").classList.remove("active")
                document.querySelector(".header ul li a[href ='#"+ sectionId +"']").parentNode.classList.add("active")
            }
        })
    })
    
    // 포트폴리오 부분
    let modal = document.querySelector(".modal")
    let modalCont = document.querySelector(".modal-cont")
    let body = document.querySelector("body")
    let workData;
    const workXttp = new XMLHttpRequest();
    workXttp.open("GET", "js/workdata.json");
    workXttp.send();
    workXttp.onreadystatechange = function (event) {
        const req = event.target;
        if (req.readyState === XMLHttpRequest.DONE) {
            workData = JSON.parse(req.response);
            parseWork(workData);
        }
    };

    function parseWork(_data) {
        let workCate = document.querySelector(".portfolio .tab-list");
        workData = _data;
        let tabHtml = ``;
        let dataArr = _data.work;
        for (let i = 0; i < dataArr.length; i++) {
            let html = `<li><a href="javascript:;">${dataArr[i].catename}</a></li>`;
            tabHtml += html;
        }
        workCate.innerHTML = tabHtml;

        let tabs = document.querySelectorAll(".portfolio .tab-list li");
        for (let i = 0; i < dataArr.length; i++) {
            tabs[0].classList.add("active");
            tabs[i].addEventListener("click", function (event) {
                event.preventDefault();
                workSlide(i)
                for (let j = 0; j < tabs.length; j++) {
                    tabs[j].classList.remove("active");
                }
                this.classList.add("active")

            })

        }
        workSlide(0)

    }
    let workSwiper;

    function workSlide(_idx) {
        let swworkHtml = ``;
        if(_idx === 2){
            let listData = workData.work[_idx].list;
            for (let i = 0; i < listData.length; i++) {
                let obj = listData[i];
                let html = `
                    <li class="swiper-slide">
                        <div class="left-cont">
                            <div class="imgbox">
                                <img src="img/${obj.imgurl}" alt="${obj.alt}">
                            </div>
                        </div>
                        <div class="txtbox">
                            <h1 class="title">${obj.title}</h1>
                            <h2 class="text">${obj.text}</h2>
                            <p class="period" 
                                ${obj.period ? "style='display:block'" : "style='display:none'"}>
                                ${obj.period}<br><span>${obj.period2}</span>
                            </p>
                            <div class="skills">
                                <h3>사용툴</h3>
                                <ul class="skill-wrap">
                                    <li ${obj.afterEffect ? "style='display:block'" : "style='display:none'"}>
                                        <img src="img/round_after_effects.png" alt="에펙 이미지">
                                    </li>
                                    <li ${obj.premiere ? "style='display:block'" : "style='display:none'"}>
                                        <img src="img/round_premiere.png" alt="프리미어 이미지">
                                    </li>
                                    <li ${obj.css ? "style='display:block'" : "style='display:none'"}>
                                        <img src="img/CSS-img.png" alt="">
                                    </li>
                                    <li ${obj.html ? "style='display:block'" : "style='display:none'"}>
                                        <img src="img/HTML-img.png" alt="">
                                    </li>
                                    <li ${obj.illust ? "style='display:block'" : "style='display:none'"}>
                                        <img src="img/round_illust.png" alt="일러스트 이미지">
                                    </li>
                                    <li ${obj.photoshop ? "style='display:block'" : "style='display:none'"}>
                                        <img src="img/round_photoshop.png" alt="포토샵 이미지">
                                    </li>
                                </ul>
                            </div>
                            <div class="work-view">view</div>
                        </div>
                        <div class="modal-view">
                            <div class="view-img">
                                <img src="img/${obj.imgurl}" alt="">
                            </div>
                        </div>
                    </li>
                `;
                swworkHtml += html;
            }
            let swworkWrapper = document.querySelector(".sw-work .swiper-wrapper");
            swworkWrapper.innerHTML = swworkHtml;
        }else{
            let listData = workData.work[_idx].list;
            for (let i = 0; i < listData.length; i++) {
                let obj = listData[i];
                let html = `
                    <li class="swiper-slide">
                        <div class="left-cont">
                            <div class="imgbox">
                                <img src="https://img.youtube.com/vi/${obj.videoid}/maxresdefault.jpg" alt="${obj.alt}">
                            </div>
                        </div>
                        <div class="txtbox">
                            <h1 class="title">${obj.title}</h1>
                            <h2 class="text">${obj.text}</h2>
                            <p class="period" 
                                ${obj.period ? "style='display:block'" : "style='display:none'"}>
                                ${obj.period}<br><span>${obj.period2}</span>
                            </p>
                            <div class="skills">
                                <h3>사용툴</h3>
                                <ul class="skill-wrap">
                                    <li ${obj.afterEffect ? "style='display:block'" : "style='display:none'"}>
                                        <img src="img/round_after_effects.png" alt="">
                                    </li>
                                    <li ${obj.premiere ? "style='display:block'" : "style='display:none'"}>
                                        <img src="img/round_premiere.png" alt="">
                                    </li>
                                    <li ${obj.css ? "style='display:block'" : "style='display:none'"}>
                                        <img src="img/CSS-img.png" alt="">
                                    </li>
                                    <li ${obj.html ? "style='display:block'" : "style='display:none'"}>
                                        <img src="img/HTML-img.png" alt="">
                                    </li>
                                    <li ${obj.illust ? "style='display:block'" : "style='display:none'"}>
                                        <img src="img/round_illust.png" alt="">
                                    </li>
                                    <li ${obj.photoshop ? "style='display:block'" : "style='display:none'"}>
                                        <img src="img/round_photoshop.png" alt="">
                                    </li>
                                </ul>
                            </div>
                            <div class="work-view">view</div>
                        </div>
                        <div class="modal-view">
                            <div class="view-player">
                                <iframe src="https://www.youtube.com/embed/${obj.videoid}" allowfullscreen></iframe>
                            </div>
                        </div>
                    </li>
                `;
                swworkHtml += html;
            }
            let swworkWrapper = document.querySelector(".sw-work .swiper-wrapper");
            swworkWrapper.innerHTML = swworkHtml;
        }
        

        if (workSwiper) {
            workSwiper.destroy();
        }
        workSwiper = new Swiper(".sw-work", {
            slidesPerView: 1,
        })

        // 썸네일 클릭 > 모달 오픈

        let workItem = document.querySelectorAll(".sw-work li")
        workItem.forEach(function (item, index) {
            item.addEventListener("click", function () {
                let obj = workData.work[_idx].list[index];
                modal.classList.add("active")
                modalCont.innerHTML = item.querySelector(".modal-view").innerHTML;
                setTimeout(function () {
                    modalCont.classList.add("active")
                }, 500)
                body.classList.add("scrollfix")
            })
        })
        modal.addEventListener("click", function () {
            modal.classList.remove("active")
            modalCont.classList.remove("active")
            body.classList.remove("scrollfix")
            modalCont.innerHTML = ``
        })
    }

    // contact mail
    document.querySelector(".mail-btn").addEventListener("click",function(){
        document.querySelector(".form-view").classList.toggle("show")
    })
    document.querySelector(".btn-x").addEventListener("click",function(){
        document.querySelector(".form-view").classList.toggle("show")
    })
}


// 포트폴리오 부분 끝