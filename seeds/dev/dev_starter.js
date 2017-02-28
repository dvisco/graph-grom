
// var startingUsers = [
//     {email: 'dom@suitable.co', password: 'BLANKPASS'},
//     {email: 'dom1@suitable.co', password: 'BLANKPASS'},
//     {email: 'dom2@suitable.co', password: 'BLANKPASS'}
// ];

exports.seed = function(knex, Promise) {

  // return Promise.all([
  //   knex('swipes').del(),
  //   knex('profiles').del(),
  //   knex('roles').del(),
  //   knex('users').del()])
  //   .then(function(){
  //       // startingUsers.map(({email, password}, i) => {
  //       //     console.log(email);
  //       //     knex('users').insert({
  //       //         email: email,
  //       //         password: password
  //       //     }).returning('id').then(([id])=> {
  //       //         console.log(id);
  //       //     });
  //       // });
  //       var ids = knex('users').insert([
  //           {email: 'dom@suitable.co', password: 'BLANKPASS'},
  //           {email: 'dom1@suitable.co', password: 'BLANKPASS'},
  //           {email: 'dom2@suitable.co', password: 'BLANKPASS'}
  //       ])
  //       .then(function(data){
  //           console.log(data);
  //           console.log(ids);
  //       })
  //   });

  var ids = knex('users').insert([
      {email: 'dom@suitable.co', password: 'BLANKPASS'},
      {email: 'dom1@suitable.co', password: 'BLANKPASS'},
      {email: 'dom2@suitable.co', password: 'BLANKPASS'}
  ])
  .then(function(data){
      console.log(data);
      console.log(ids);
  })
  
  //
  // ]);
};
