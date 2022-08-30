const data_mapper = {
  username: ['profileData'],
};

const data_source = [
  {
    _id: "6085cbb76bb68beb194ece6c",
    profileType: "INSTAGRAM",
    profileData: {
      userId: "504773887",
      profile: {
        engagementRate: 0.0039088792260909555,
        engagements: 7811,
        followers: 2056336,
        fullname: "Memes | Culture | Comedy",
        picture:
          "https://imgigp.modash.io/v2?mb0KwpL92uYofJiSjDn1%2F6peL1lBwv3s%2BUvShHERlDb05bk9EAgW7oQoJCzCEnmGPs8f4ZuYrytY6bc6KiLJuEaxY8y0dTYPN89XWIopJYviQzsp%2FYX2cSherwEAROf9Wwq5%2BhsabX0Nc9aXCBbcsw%3D%3D",
        url: "https://www.instagram.com/thehumourcentre",
        username: "thehumourcentre",
        isPrivate: false,
      },
    },
  },
];


// find username from data source based on data mapper
data_source?.map((data)=>{
    console.log(data[data_mapper.username]);
})
    // console.log(find_username(data_source, data_mapper));