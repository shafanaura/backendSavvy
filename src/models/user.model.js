const dbConn = require("../helpers/db");
const table = "users";

exports.getUsersById = (id) => {
  return new Promise((resolve, reject) => {
    const query = dbConn.query(
      `SELECT * FROM ${table} WHERE id=${id}`,
      (err, res, field) => {
        if (err) reject(err);
        resolve(res);
      }
    );
    console.log(query.sql);
  });
};

exports.getUsersByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    const query = dbConn.query(
      `SELECT * FROM ${table} WHERE ${Object.keys(cond)
        .map((item) => `${item}="${cond[item]}"`)
        .join(" AND ")}`,
      (err, res, field) => {
        if (err) reject(err);
        resolve(res);
      }
    );
    console.log(query.sql);
  });
};

exports.getListUsersByCondition = (id, cond) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `SELECT * FROM ${table} u
			WHERE u.id != ${id} AND u.fullName LIKE "%${cond.search}%"
			ORDER BY ${cond.sort} ${cond.order} 
			LIMIT ${cond.limit} OFFSET ${cond.offset}`,
      (err, res, field) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
};

exports.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const query = dbConn.query(`SELECT * FROM ${table}`, (err, res, field) => {
      if (err) reject(err);
      resolve(res);
    });
    console.log(query.sql);
  });
};

exports.createUser = (data) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      `INSERT INTO ${table} (${Object.keys(
        data
      ).join()}) VALUES (${Object.values(data)
        .map((item) => `"${item}"`)
        .join(",")})`,
      (err, res, field) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
};

exports.updateUser = (id, data) => {
  return new Promise((resolve, reject) => {
    const key = Object.keys(data);
    const value = Object.values(data);
    dbConn.query(
      `UPDATE ${table}
			SET ${key.map((item, index) => `${item}="${value[index]}"`)}
			WHERE id=${id}`,
      (err, res, field) => {
        if (err) reject(err);
        resolve(res);
      }
    );
  });
};

exports.getUsersCountByCondition = (id, cond) => {
  return new Promise((resolve, reject) => {
    const query = dbConn.query(
      `
    SELECT COUNT(fullName) as totalData FROM
    ${table} WHERE id != ${id} AND fullName LIKE "%${cond.search}%"
    ORDER BY ${cond.sort} ${cond.order}
    `,
      (err, res, field) => {
        if (err) reject(err);
        resolve(res);
      }
    );
    console.log(query.sql);
  });
};
