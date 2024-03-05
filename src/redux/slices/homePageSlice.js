import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  headerImage: "",
  headerImage2: "",
  headerImage3: "",
  mainQuotation: "",
  mainQuotation2: "",
  mainQuotation3: "",
  embodyingYourFullness: {
    heading: "",
    text: "",
    buttonText: "",
    video: "",
    videoDuration: "",
    thumbnail: "",
  },
  comingHomeTogether: {
    heading: "",
    text: "",
    buttonText: "",
    video: "",
    videoDuration: "",
    thumbnail: "",
  },
  hiw1: {
    heading: "",
    text: "",
    image: "",
  },
  hiw2: {
    heading: "",
    text: "",
    image: "",
  },
  hiw3: {
    heading: "",
    text: "",
    image: "",
  },
  hiw4: {
    heading: "",
    text: "",
    image: "",
  },
  headline1: {
    heading: "",
    text: "",
  },
  headline2: {
    heading: "",
    text: "",
  },
  headline3: {
    heading: "",
    text: "",
  },
  headline4: {
    heading: "",
    text: "",
  },
  sampleToolsHeading: "",
  sampleTools1: {
    heading: "",
    icon: "",
    text: "",
    video: "",
    videoDuration: "",
    thumbnail: "",
  },
  sampleTools2: {
    heading: "",
    icon: "",
    text: "",
    video: "",
    videoDuration: "",
    thumbnail: "",
  },
  moreVGHeading: "",
  creationStory: {
    heading: "",
    text: "",
    buttonText: "",
    video: "",
    videoDuration: "",
    thumbnail: "",
  },
  vibeBloomApp: {
    heading: "",
    text: "",
    buttonText: "",
    video: "",
    videoDuration: "",
    thumbnail: "",
  },
  teacher: {
    heading: "",
    text: "",
    buttonText: "",
    video: "",
    videoDuration: "",
    thumbnail: "",
  },
};

const homePageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {
    setHero: (state, action) => {
      state.headerImage = action.payload.headerImage || state.headerImage;
      state.headerImage2 = action.payload.headerImage2 || state.headerImage2;
      state.headerImage3 = action.payload.headerImage3 || state.headerImage3;
      state.mainQuotation = action.payload.mainQuotation || state.mainQuotation;
      state.mainQuotation2 =
        action.payload.mainQuotation2 || state.mainQuotation2;
      state.mainQuotation3 =
        action.payload.mainQuotation3 || state.mainQuotation3;
    },
    setEmbodyingYourFullness: (state, action) => {
      state.embodyingYourFullness.heading =
        action.payload.embodyingYourFullness?.heading ||
        state.embodyingYourFullness.heading;
      state.embodyingYourFullness.text =
        action.payload.embodyingYourFullness?.text ||
        state.embodyingYourFullness.text;
      state.embodyingYourFullness.buttonText =
        action.payload.embodyingYourFullness?.buttonText ||
        state.embodyingYourFullness.buttonText;
      state.embodyingYourFullness.video =
        action.payload.embodyingYourFullness?.video ||
        state.embodyingYourFullness.video;
      state.embodyingYourFullness.videoDuration =
        action.payload.embodyingYourFullness?.videoDuration ||
        state.embodyingYourFullness.videoDuration;
      state.embodyingYourFullness.thumbnail =
        action.payload.embodyingYourFullness?.thumbnail ||
        state.embodyingYourFullness.thumbnail;
    },
    setComingHomeTogether: (state, action) => {
      state.comingHomeTogether.heading =
        action.payload.comingHomeTogether?.heading ||
        state.comingHomeTogether.heading;
      state.comingHomeTogether.text =
        action.payload.comingHomeTogether?.text ||
        state.comingHomeTogether.text;
      state.comingHomeTogether.buttonText =
        action.payload.comingHomeTogether?.buttonText ||
        state.comingHomeTogether.buttonText;
      state.comingHomeTogether.video =
        action.payload.comingHomeTogether?.video ||
        state.comingHomeTogether.video;
      state.comingHomeTogether.videoDuration =
        action.payload.comingHomeTogether?.videoDuration ||
        state.comingHomeTogether.videoDuration;
      state.comingHomeTogether.thumbnail =
        action.payload.comingHomeTogether?.thumbnail ||
        state.comingHomeTogether.thumbnail;
    },
    setHiw1: (state, action) => {
      state.hiw1.heading = action.payload.hiw1.heading || state.hiw1.heading;
      state.hiw1.text = action.payload.hiw1.text || state.hiw1.text;
      state.hiw1.image = action.payload.hiw1.image || state.hiw1.image;
    },
    setHiw2: (state, action) => {
      state.hiw2.heading = action.payload.hiw2.heading || state.hiw2.heading;
      state.hiw2.text = action.payload.hiw2.text || state.hiw2.text;
      state.hiw2.image = action.payload.hiw2.image || state.hiw2.image;
    },
    setHiw3: (state, action) => {
      state.hiw3.heading = action.payload.hiw3.heading || state.hiw3.heading;
      state.hiw3.text = action.payload.hiw3.text || state.hiw3.text;
      state.hiw3.image = action.payload.hiw3.image || state.hiw3.image;
    },
    setHiw4: (state, action) => {
      state.hiw4.heading = action.payload.hiw4.heading || state.hiw4.heading;
      state.hiw4.text = action.payload.hiw4.text || state.hiw4.text;
      state.hiw4.image = action.payload.hiw4.image || state.hiw4.image;
    },
    setHeadline1: (state, action) => {
      state.headline1.heading =
        action.payload.headline1.heading || state.headline1.heading;
      state.headline1.text =
        action.payload.headline1.text || state.headline1.text;
    },
    setHeadline2: (state, action) => {
      state.headline2.heading =
        action.payload.headline2.heading || state.headline2.heading;
      state.headline2.text =
        action.payload.headline2.text || state.headline2.text;
    },
    setHeadline3: (state, action) => {
      state.headline3.heading =
        action.payload.headline3.heading || state.headline3.heading;
      state.headline3.text =
        action.payload.headline3.text || state.headline3.text;
    },
    setHeadline4: (state, action) => {
      state.headline4.heading =
        action.payload.headline4.heading || state.headline4.heading;
      state.headline4.text =
        action.payload.headline4.text || state.headline4.text;
    },
    setSampleToolsHeading: (state, action) => {
      state.sampleToolsHeading =
        action.payload.sampleToolsHeading || state.sampleToolsHeading;
    },
    setSampleTools1: (state, action) => {
      state.sampleTools1.heading =
        action.payload.sampleTools1.heading || state.sampleTools1.heading;
      state.sampleTools1.icon =
        action.payload.sampleTools1.icon || state.sampleTools1.icon;
      state.sampleTools1.text =
        action.payload.sampleTools1.text || state.sampleTools1.text;
      state.sampleTools1.video =
        action.payload.sampleTools1.video || state.sampleTools1.video;
      state.sampleTools1.videoDuration =
        action.payload.sampleTools1.videoDuration ||
        state.sampleTools1.videoDuration;
      state.sampleTools1.thumbnail =
        action.payload.sampleTools1.thumbnail || state.sampleTools1.thumbnail;
    },
    setSampleTools2: (state, action) => {
      state.sampleTools2.heading =
        action.payload.sampleTools2.heading || state.sampleTools2.heading;
      state.sampleTools2.icon =
        action.payload.sampleTools2.icon || state.sampleTools2.icon;
      state.sampleTools2.text =
        action.payload.sampleTools2.text || state.sampleTools2.text;
      state.sampleTools2.video =
        action.payload.sampleTools2.video || state.sampleTools2.video;
      state.sampleTools2.videoDuration =
        action.payload.sampleTools2.videoDuration ||
        state.sampleTools2.videoDuration;
      state.sampleTools2.thumbnail =
        action.payload.sampleTools2.thumbnail || state.sampleTools2.thumbnail;
    },
    setMoreVGHeading: (state, action) => {
      state.moreVGHeading = action.payload.moreVGHeading || state.moreVGHeading;
    },
    setCreationStory: (state, action) => {
      state.creationStory.heading =
        action.payload.creationStory?.heading || state.creationStory.heading;
      state.creationStory.text =
        action.payload.creationStory?.text || state.creationStory.text;
      state.creationStory.buttonText =
        action.payload.creationStory?.buttonText ||
        state.creationStory.buttonText;
      state.creationStory.video =
        action.payload.creationStory?.video || state.creationStory.video;
      state.creationStory.videoDuration =
        action.payload.creationStory?.videoDuration ||
        state.creationStory.videoDuration;
      state.creationStory.thumbnail =
        action.payload.creationStory?.thumbnail ||
        state.creationStory.thumbnail;
    },
    setVibeBloomApp: (state, action) => {
      state.vibeBloomApp.heading =
        action.payload.vibeBloomApp?.heading || state.vibeBloomApp.heading;
      state.vibeBloomApp.text =
        action.payload.vibeBloomApp?.text || state.vibeBloomApp.text;
      state.vibeBloomApp.buttonText =
        action.payload.vibeBloomApp?.buttonText ||
        state.vibeBloomApp.buttonText;
      state.vibeBloomApp.video =
        action.payload.vibeBloomApp?.video || state.vibeBloomApp.video;
      state.vibeBloomApp.videoDuration =
        action.payload.vibeBloomApp?.videoDuration ||
        state.vibeBloomApp.videoDuration;
      state.vibeBloomApp.thumbnail =
        action.payload.vibeBloomApp?.thumbnail || state.vibeBloomApp.thumbnail;
    },
    setTeacher: (state, action) => {
      state.teacher.heading =
        action.payload.teacher?.heading || state.teacher.heading;
      state.teacher.text = action.payload.teacher?.text || state.teacher.text;
      state.teacher.buttonText =
        action.payload.teacher?.buttonText || state.teacher.buttonText;
      state.teacher.video =
        action.payload.teacher?.video || state.teacher.video;
      state.teacher.videoDuration =
        action.payload.teacher?.videoDuration || state.teacher.videoDuration;
      state.teacher.thumbnail =
        action.payload.teacher?.thumbnail || state.teacher.thumbnail;
    },
  },
});

export const {
  setHero,
  setEmbodyingYourFullness,
  setComingHomeTogether,
  setCreationStory,
  setHeadline1,
  setHeadline2,
  setHeadline3,
  setHeadline4,
  setHiw1,
  setHiw2,
  setHiw3,
  setHiw4,
  setMoreVGHeading,
  setSampleTools1,
  setSampleTools2,
  setSampleToolsHeading,
  setTeacher,
  setVibeBloomApp,
} = homePageSlice.actions;
export default homePageSlice.reducer;
