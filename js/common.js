/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var status = 0;

var gosIsInTheDetailsHome = {

  showHome: function () {
    $("#content").removeClass("hideFadeIn");
    $("#content").addClass("showFadeIn");
    $("#imgPlayer").on("click", function () {
      gosIsInTheDetailsHome.launchMoviePresentation();
    });
  },

  launchMoviePresentation: function () {
    $("#imgPlayer").hide();
    $("#firstMoovie").get(0).play();


    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      $("#pressSpaceTuto").html("Press the screen one time in order to see the next content");
      $("#escapeTuto").html("Press the screen two times in order to go back to the home");
    }

    $('#firstMoovie').on('ended', function () {
      $("#firstMoovie").addClass("hideFadeIn");
      gosIsInTheDetailsHome.showBackgroundMovie();
      gosIsInTheDetailsHome.showButtonHome();
    });
  },

  hideBackgroundMovie: function () {
    $("#backgroundMovie").addClass("hide");
    $("#backgroundMovie").removeClass("show");
    $("#backgroundMovie").get(0).pause();
  },

  showBackgroundMovie: function () {
    $("#backgroundMovie").addClass("show");
    $("#backgroundMovie").removeClass("hide");
    var video = document.getElementById("backgroundMovie");
    video.currentTime = 0;
    $("#backgroundMovie").get(0).play();
  },

  showButtonHome: function () {
    $(".linkDiscover").removeClass("hideFadeIn");
    $(".linkInside").removeClass("hideFadeIn");
    $(".linkBehind").removeClass("hideFadeIn");

    $(".linkDiscover").addClass("showFadeIn");
    $(".linkInside").addClass("showFadeIn");
    $(".linkBehind").addClass("showFadeIn");

    $("#linkInside").on("click", function (e) {
      gosIsInTheDetailsHome.hideButtonHome();
      gosIsInTheDetailsInside.launchTuto();
    });

    $("#linkBehind").on("click", function (e) {
      gosIsInTheDetailsHome.hideButtonHome();
      gosIsInTheBehindTheScene.showModal();
    });
  },

  hideButtonHome: function () {
    $(".linkDiscover").addClass("hideFadeIn");
    $(".linkInside").addClass("hideFadeIn");
    $(".linkBehind").addClass("hideFadeIn");
    $(".linkDiscover").removeClass("showFadeIn");
    $(".linkInside").removeClass("showFadeIn");
    $(".linkBehind").removeClass("showFadeIn");

    $("#linkInside").off("click");
    $("#linkBehind").off("click");
  }
};


var gosIsInTheDetailsInside = {

  statusTuto: 1,
  canNextGif: true,
  closeInside: false,
  dirGifStart: false,
  currentlyGifDir: 0,
  currentlyDir: 0,
  isFirst: true,
  firstSetTimeout: null,
  clickFirst: 0,
  secondSetTimeout: null,
  clickSecond: 0,

  arrayCompoGif: [],

  launchTuto: function () {
    this.isFirst = true;

    mThis = this;
    mThis.statusTuto = 1;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      mThis.clickFirst = 0;

      $("body").on("click", function (e) {
        mThis.clickFirst++
        if (mThis.clickFirst === 2) {
          mThis.clickFirst = 0;
          clearTimeout(mThis.firstSetTimeout);

          mThis.stopActionBody();
          mThis.goHome();
        } else if (mThis.clickFirst === 1) {
          mThis.firstSetTimeout = setTimeout(function () {
            mThis.clickFirst = 0;

            if (mThis.isFirst) {
              mThis.isFirst = false;
            } else {
              mThis.nextTuto();
            }
          }, 200);
        }
      });
    } else {
      $("body").on("keyup", function (e) {
        if (e.keyCode === 32) {
          mThis.nextTuto();
        } else if (e.keyCode === 27) {
          mThis.stopActionBody();
          mThis.goHome();
        }
      });
    }


    this.showTutoOne();
  },

  stopActionBody: function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      $("body").off("click");
    } else {
      $("body").off("keyup");
    }
  },

  showTutoOne: function () {
    $("#pressSpaceTuto").removeClass("hide");
  },

  showTutoTwo: function () {
    $("#randomTuto").removeClass("hide");
  },

  showTutoThree: function () {
    $("#escapeTuto").removeClass("hide");
  },

  goHome: function () {
    switch (this.statusTuto) {
      case 1 :
        $("#pressSpaceTuto").addClass("hide");
        break;
      case 2 :
        $("#randomTuto").addClass("hide");
        break;
      case 3 :
        $("#escapeTuto").addClass("hide");
        break;
      case 4 :
        $(".imgHome").removeClass("hide");
        $("#imgGifRandom").addClass("hide");
        break;
    }
    gosIsInTheDetailsHome.showButtonHome();
  },

  nextTuto: function () {
    switch (this.statusTuto) {
      case 1 :
        $("#pressSpaceTuto").addClass("hide");
        this.showTutoTwo();
        break;
      case 2 :
        $("#randomTuto").addClass("hide");
        this.showTutoThree();
        break;
      case 3 :
        $("#escapeTuto").addClass("hide");
        this.stopActionBody();
        this.showGifRandom();
        break;

    }
    this.statusTuto++;
  },

  launchMusicGif: function () {
    var video = document.getElementById("musicGif");
    video.currentTime = 0;
    $("#musicGif").get(0).play();
  },

  stopMusicGif: function () {
    $("#musicGif").get(0).pause();
  },

  showGifRandom: function () {

    this.closeInside = false;
    this.dirGifStart = false;
    this.initArrayGif();

    $(".imgHome").addClass("hide");
    $("#imgGifRandom").removeClass("hide");
    this.launchMusicGif();
    gosIsInTheDetailsHome.hideBackgroundMovie();

    this.nextGif();


    mThis = this;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      mThis.clickSecond = 0;

      $("body").on("click", function () {
        mThis.clickSecond++;
        if (mThis.clickSecond === 2) {
          mThis.clickSecond = 0;
          clearTimeout(mThis.secondSetTimeout);
          mThis.closeInside = true;
          $("#imgLoader").hide();
          $(".moreInfo").off();
          $(".cross").off();
          $("#blockGifRandom").hide().fadeOut();
          mThis.stopMusicGif();
          mThis.hideMoreInfo();

          gosIsInTheDetailsHome.showBackgroundMovie();

          mThis.stopActionBody();
          mThis.goHome();
        } else if (mThis.clickSecond === 1) {
          mThis.secondSetTimeout = setTimeout(function () {
            mThis.clickSecond = 0;
            mThis.nextGif();
          }, 200);
        }
      });
    } else {
      $("body").on("keyup", function (e) {
        if (e.keyCode === 32 && mThis.canNextGif) {
          mThis.nextGif();
        } else if (e.keyCode === 27) {
          mThis.closeInside = true;
          $("#imgLoader").hide();
          $(".moreInfo").off();
          $(".cross").off();
          $("#blockGifRandom").hide().fadeOut();
          mThis.stopMusicGif();
          mThis.hideMoreInfo();

          gosIsInTheDetailsHome.showBackgroundMovie();

          mThis.stopActionBody();
          mThis.goHome();
        }
      });
    }


  },

  initArrayGif: function () {
    mThis = this;
    $.getJSON("json/content_gif.json", function (data) {
      mThis.arrayCompoGif = data;
      mThis.nextGif();
    });
  },

  nextGif: function () {
    var needDeleteDirGif = false;
    this.canNextGif = false;

    mThis = this;

    if (this.arrayCompoGif.length === 0) {
      this.initArrayGif();
    } else {
      if (this.dirGifStart) {
        this.currentlyGifDir++;
        if (this.currentlyGifDir === this.arrayCompoGif[this.currentlyDir]["content"].length - 1) {
          this.dirGifStart = false;
          needDeleteDirGif = true;
        }
      } else {
        this.currentlyDir = Math.floor((Math.random() * this.arrayCompoGif.length));
        this.currentlyGifDir = 0;
        this.dirGifStart = true;
      }

      $("#imgGifRandom").attr("src", "img/gifRandom/" + this.arrayCompoGif[this.currentlyDir]["dir"] + "/COMPO_" + this.arrayCompoGif[this.currentlyDir]["content"][this.currentlyGifDir]["chiffre"] + ".gif");
      $("#descriptionGif").html(this.arrayCompoGif[this.currentlyDir]["content"][this.currentlyGifDir]["text"]);
      $("#titleMoreInfo").html(this.arrayCompoGif[this.currentlyDir]["content"][this.currentlyGifDir]["titre"]);

      $("#imgLoader").show();
      $("#blockGifRandom").hide().fadeOut();

      $(".moreInfo").on("click", function (e) {
        mThis.showMoreInfo();
        e.stopPropagation();
      });

      $(".cross").on("click", function (e) {
        mThis.hideMoreInfo();
        e.stopPropagation();
      });
      this.hideMoreInfo();
      $("#imgGifRandom").on("load", function () {
        if (mThis.closeInside === false) {
          mThis.canNextGif = true;
          $("#blockGifRandom").show().fadeIn();
          $("#imgLoader").hide();
          $("#imgGifRandom").off();
        }
      });

      if (needDeleteDirGif) {
        this.arrayCompoGif.splice(this.currentlyDir, 1);
      }
    }
  },

  showMoreInfo: function () {
    $(".moreInfo").addClass("hideFadeIn");
    $(".moreInfo").removeClass("showFadeIn");
    $(".openInfo").removeClass("hideFadeIn");
    $(".openInfo").addClass("showFadeIn");

  },

  hideMoreInfo: function () {
    $(".moreInfo").removeClass("hideFadeIn");
    $(".moreInfo").addClass("showFadeIn");
    $(".openInfo").addClass("hideFadeIn");
    $(".openInfo").removeClass("showFadeIn");
  }
};

gosIsInTheBehindTheScene = {
  showModal: function () {

    $("#modal").removeClass("hide");
    mThis = this;
    $("#modal").on("click", function () {
      mThis.hideModal();
    }).children().click(function () {
      return false;
    });

    $(".crossMobile").on("click", function () {
      mThis.hideModal();
    })
  },

  hideModal: function () {
    $("#modal").addClass("hide");
    $("#modal").off();
    gosIsInTheDetailsHome.showButtonHome();
  }
};


$(window).on("load", function () {
  $("#imgLoader").addClass("hide");
  gosIsInTheDetailsHome.showHome();
});