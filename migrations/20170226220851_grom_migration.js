
exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.createTable('users', (table) => {
        table.increments().primary();
        table.timestamps();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
      }),

      knex.schema.createTable('roles', (table) => {
        table.increments().primary();
        table.timestamps();
        table.string('authority').notNullable();
        table.integer('user_id').references('users.id')
      }),

      knex.schema.createTable('profiles', (table) => {
        table.increments().primary();
        table.timestamps();
        table.string('first_name');
        table.string('last_name');
        table.string('photo_url');
        table.integer('user_id').unique().references('users.id');
      }),

      knex.schema.createTable('swipes', (table) => {
        table.increments().primary();
        table.timestamps();
        table.string('direction').notNullable();
        table.integer('swiper_id').references('profiles.id');
        table.integer('swipee_id').references('profiles.id');
        table.unique(['swiper_id', 'swipee_id']);
      }),

    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('swipes'),
        knex.schema.dropTable('profiles'),
        knex.schema.dropTable('roles'),
        knex.schema.dropTable('users'),
    ]);
};
