
var startingUsers = [
    {email: 'dom@suitable.co', password: 'BLANKPASS'},
    {email: 'dom1@suitable.co', password: 'BLANKPASS'},
    {email: 'dom2@suitable.co', password: 'BLANKPASS'}
];

function createUser(knex, user) {
  return knex.table('users')
    .returning('id')
    .insert(
    {
      email: user.email,
      password: user.password
    }
  )
    .then(function(userIds){
      return knex('profiles')
        .insert(
        {
          first_name: "firstName",
          last_name: "lastname",
          user_id: userIds[0]
        }
    ).then(function(){
        return knex('roles')
          .insert(
          {
            authority: "ROLE_USER",
            user_id: userIds[0]
        });
    });

    });
}

exports.seed = function(knex, Promise) {
    return knex('swipes').del()
    .then(() => {
      return knex('profiles').del()
      .then(() => {
          return knex('roles').del()
          .then(() => {
              return knex('users').del()
              .then(() => {
                  var userPromises = [];
                  startingUsers.forEach(function(user){
                      userPromises.push(createUser(knex, user));
                  });
                  return Promise.all(userPromises);
              });
          });
      });
    });
};
