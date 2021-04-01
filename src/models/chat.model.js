const dbConn = require("../helpers/db");
const table = "messages";

exports.getMessageById = (recipient_id, sender_id) => {
  return new Promise((resolve, reject) => {
    const query = dbConn.query(
      `
      SELECT * FROM ${table} 
      WHERE sender_id=${recipient_id} AND recipient_id=${sender_id}
      OR recipient_id=${recipient_id} AND sender_id=${sender_id}
      `,
      (err, res, field) => {
        if (err) reject(err);
        resolve(res);
      }
    );
    console.log(query.sql);
  });
};

exports.getChatListById = (id) => {
  return new Promise((resolve, reject) => {
    const query = dbConn.query(
      `
      SELECT ${table}.*,users.id AS userId, users.fullName as senderName, users.picture FROM ${table}
      INNER JOIN users ON users.id = IF (sender_id = ${id}, recipient_id, sender_id) 
      WHERE (sender_id=${id} OR recipient_id=${id}) AND ${table}.isLast = 1
      ORDER BY ${table}.createdAt DESC
      `,
      (err, res, field) => {
        if (err) reject(err);
        resolve(res);
      }
    );
    console.log(query.sql);
  });
};

exports.changeLastChat = (sender_id, recipient_id) => {
  return new Promise((resolve, reject) => {
    const query = dbConn.query(
      `
      UPDATE ${table} SET isLast = '0'
      WHERE sender_id=${recipient_id} AND recipient_id=${sender_id}
      OR recipient_id=${recipient_id} AND sender_id=${sender_id}
      `,
      (err, res, field) => {
        if (err) reject(err);
        resolve(res);
      }
    );
    console.log(query.sql);
  });
};

exports.getMessagesByCondition = (cond) => {
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

exports.getAllMessages = () => {
  return new Promise((resolve, reject) => {
    const query = dbConn.query(`SELECT * FROM ${table}`, (err, res, field) => {
      if (err) reject(err);
      resolve(res);
    });
    console.log(query.sql);
  });
};

exports.createMessage = (data) => {
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

exports.updateMessage = (id, data) => {
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

exports.getMessagesCountByCondition = (cond) => {
  return new Promise((resolve, reject) => {
    const query = dbConn.query(
      `
    SELECT COUNT(message) as totalData FROM
    ${table} WHERE message LIKE "%${cond.search}%"
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

exports.getRecipientById = (id) => {
  return new Promise((resolve, reject) => {
    const query = dbConn.query(
      `SELECT sender_id FROM ${table} WHERE recipient_id=${id}`,
      (err, res, field) => {
        if (err) reject(err);
        resolve(res);
      }
    );
    console.log(query.sql);
  });
};
