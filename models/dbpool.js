module.exports = function(sequelize, Sequelize){
    return sequelize.define('Pool',{
        PoolID : {
            type : Sequelize.INTEGER,
            allowNull : false
        },
        PoolName : {
            type : Sequelize.STRING,
            allowNull : false,
            validate : {
                len : [0,500]
            }
        },
        VisitorID : {
            type : Sequelize.INTEGER,
            allowNull : false
        }
    });
}