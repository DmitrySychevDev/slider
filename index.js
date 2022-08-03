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
        this._init_slides();
        this._transmitionIsComplete=true;
        this._createDots();
        this._dotsList=document.querySelectorAll(".dot");
    }
    //======================================================
    _createDots(){

        for(let i=0;i<this._slidesList.length;i++)
        {
            let dot=document.createElement("button");
            if(i==0) dot.classList.add("dot_active");
            dot.classList.add("dot");
            //.................................................................
            dot.addEventListener("click",(e)=>{
                if(this._transmitionIsComplete){
                const dotIndex=this._getIndex(e.target,this._dotsList);
                const curentIndex=this._getIndex(this._nearestSlides.curentSlide,this._slidesList);
                let direction;
                if(curentIndex>dotIndex){
                    this._nearestSlides.prevSlide.style.display="none";
                   this._nearestSlides.prevSlide=this._slidesList[dotIndex];
                   this._nearestSlides.prevSlide.style.display="block";

                   direction="left";
                }
    
                if(curentIndex<dotIndex){
                    this._nearestSlides.nextSlide.style.display="none";
                    this._nearestSlides.nextSlide=this._slidesList[dotIndex];
                    this._nearestSlides.nextSlide.style.display="block";
                    direction="right";
                }
                this.slideTransmition(direction)();
                this._setActiveDot(dotIndex);
            }
            });
            this._dotsBlock.appendChild(dot);
        }
    }
    
    //=======================================================
    _setActiveDot(index){
        this._dotsList.forEach((dot)=>{
            if(dot.classList.contains("dot_active")) dot.classList.remove("dot_active");
        });
        this._dotsList[index].classList.add("dot_active");
    }
    //================================================
    _getIndex(elem,arr){
        let searcIndex;
        arr.forEach((element,index)=>{
            if(element===elem){ 
                searcIndex=index;
            }
        });
        return searcIndex
    }
    //=====================================================

    slideTransmition(direction){
        return ()=>{
        if(this._transmitionIsComplete){
        this._transmitionIsComplete=false;
        let leftOfset=0;
        let interval=setInterval(()=>{
        switch(direction){
            case "right":
                console.log("right");
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
        //............................................................................
        if(this._transmitionIsComplete){
            //переназначение слайдов
           
        if(direction=="right"){
            this._nearestSlides.curentSlide=this._nearestSlides.nextSlide;
        }
        //...................................................
        if(direction=="left"){
                this._nearestSlides.curentSlide=this._nearestSlides.prevSlide;        
        }
        //..............................................................................
        const curentIndex=this._getIndex(this._nearestSlides.curentSlide,this._slidesList);
        if(curentIndex==0){
            this._nearestSlides.prevSlide=this._slidesList[this._slidesNum-1];
        }
        else this._nearestSlides.prevSlide=this._slidesList[curentIndex-1];
        //..................................................................
        if(curentIndex==this._slidesNum-1) this._nearestSlides.nextSlide=this._slidesList[0];
        else this._nearestSlides.nextSlide=this._slidesList[curentIndex+1];
        //..............................................
        this._init_slides();
        clearInterval(interval);
        this._setActiveDot(curentIndex);
        }
        },5);

    }
    }
}
//============================================================================
    _init_slides(){
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
const sliderObj=new Slider(document.querySelectorAll(".slider__slide"),document.querySelector(".dots-wraper"));
document.querySelector(".prev").addEventListener("click",sliderObj.slideTransmition("left"));
document.querySelector(".next").addEventListener("click",sliderObj.slideTransmition("right"));
