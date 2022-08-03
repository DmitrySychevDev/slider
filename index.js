class Slider{
    constructor(slides,dots){
        this._slidesList=slides;
        this._dotsBlock=dots;
        this._slidesNum=this._slidesList.length;
        this._nearestSlides={
            prevSlide:this._slidesList[this._slidesNum-1],
            curentSlide:this._slidesList[0],
            nextSlide:this._slidesList[1],
        };
        this._transmitionIsComplete=true;
    }
    _getIndex(elem,arr){
        let searcIndex;
        arr.forEach((element,index)=>{
            console.log(element)
            if(element===elem){ 
                searcIndex=index;
            }
        });
        return searcIndex
    }
    slideTransmition(direction){
        return ()=>{
        if(this._transmitionIsComplete){
        this._transmitionIsComplete=false;
        let leftOfset=0;
        let interval=setInterval(()=>{
        switch(direction){
            case "right":
                leftOfset++;
                this._nearestSlides.nextSlide.style.left=(105-leftOfset)+"%";
                this._nearestSlides.curentSlide.style.left=(-leftOfset)+"%";
                break;
            case "left":
                leftOfset++;
                this._nearestSlides.prevSlide.style.left=(-105+leftOfset)+"%";
                this._nearestSlides.curentSlide.style.left=(leftOfset)+"%";
                break;
            }
        if(leftOfset==105){
            this._transmitionIsComplete=true;   
            }
                    //.....................................................
        if(this._transmitionIsComplete){
            //переназначение слайдов
            console.log("Переназначение")
        if(direction=="right"){
            this._nearestSlides.prevSlide=this._nearestSlides.curentSlide;
            this._nearestSlides.curentSlide=this._nearestSlides.nextSlide;
            const nextIndex=this._getIndex(this._nearestSlides.nextSlide,this._slidesList);
            console.log(nextIndex);
            if(nextIndex==this._slidesNum-1){
                this._nearestSlides.nextSlide=this._slidesList[0];
            }
            else this._nearestSlides.nextSlide=this._slidesList[nextIndex+1];
        }
        //...................................................
        if(direction=="left"){
            this._nearestSlides.nextSlide=this._nearestSlides.curentSlide;
            this._nearestSlides.curentSlide=this._nearestSlides.prevSlide;
            const prevIndex=this._getIndex(this._nearestSlides.prevSlide,this._slidesList);
            if(prevIndex==0){
                this._nearestSlides.prevSlide=this._slidesList[this._slidesNum-1];
            }
            else this._nearestSlides.prevSlide=this._slidesList[prevIndex-1];
        }
        this.init_slides();
        clearInterval(interval);

        }
        },5);

    }
    }
}
    init_slides(){
        this._nearestSlides.curentSlide.style.left="0%";
        this._nearestSlides.nextSlide.style.left="105%";
        this._nearestSlides.prevSlide.style.left="-105%";
        this._slidesList.forEach((slide,index )=> {
           if(!(slide==this._nearestSlides.prevSlide||slide==this._nearestSlides.curentSlide||slide==this._nearestSlides.nextSlide))
           {
            slide.style.display="none";
           }
           else
           slide.style.display="block";
        });
    }
}
const sliderObj=new Slider(document.querySelectorAll(".slider__slide"),document.querySelectorAll(".dots-wraper"));
document.querySelector(".prev").addEventListener("click",sliderObj.slideTransmition("left"));
document.querySelector(".next").addEventListener("click",sliderObj.slideTransmition("right"));
sliderObj.init_slides();
