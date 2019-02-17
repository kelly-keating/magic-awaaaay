
exports.up = function(knex, Promise) {
    return knex.schema.createTable('sets', function (table) {
        table.string('id')
        table.string('code')
        table.string('name')
        table.string('block')
        table.string('block_code')
        table.integer('card_count')
        table.string('icon_svg_uri')
        table.string('released_at')
        table.string('set_type')
        table.string('uri')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('sets')
};
