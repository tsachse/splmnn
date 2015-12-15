var media = {
    startTime: 0,
    endTime: -1,
   
    getID : function() {
        vid = $("#qt_repeat");
        return(vid);
    },
    
    getTime : function(timeInSecs) {
        vid = this.getID();
        return(vid[0].currentTime);
    },
    
    jumpToTime : function(timeInSecs) {
        vid = this.getID();
        vid[0].currentTime = timeInSecs;
    },
    
    abRepeat : function(startTimeInSecs, endTimeInSecs) {
        vid = this.getID();
        media.startTime = startTimeInSecs;
        media.endTime = endTimeInSecs;
        media.jumpToTime(media.startTime);
        vid.bind('timeupdate',function() {
           vid = media.getID();
           if(media.endTime> -1 && vid[0].currentTime > media.endTime) {
               media.jumpToTime(media.startTime);
           }
        });
    },

    start: function() {
        vid = this.getID();
        vid[0].play();

    },

    
    load: function() {
        vid = this.getID();
        vid[0].load();
        console.log('load');
    },
  
    loadAndRepeat: function(startTimeInSecs, endTimeInSecs) {
        vid = this.getID();
        vid[0].load();
        //console.log('loadAndRepeat');
        setTimeout(
            function() {
                media.abRepeat(startTimeInSecs, endTimeInSecs);
                media.start();
            },
            1000);   
    },
   
    pause: function() {
        vid = this.getID();	
        vid[0].pause();
        media.endTime = -1;
    }
};



