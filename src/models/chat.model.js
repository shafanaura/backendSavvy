const dbConn = require("../helpers/db");
const table = "messages";

exports.getMessageById = (recipient_id, sender_id, cond) => {
  return new Promise((resolve, reject) => {
    const query = dbConn.query(
      `
      SELECT * FROM ${table} 
      WHERE ((sender_id=${recipient_id} AND recipient_id=${sender_id})
      OR (recipient_id=${recipient_id} AND sender_id=${sender_id}))
      ORDER BY ${cond.sort} ${cond.order}
      LIMIT ${cond.limit} OFFSET ${cond.offset} 
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
      SELECT m.*,users.id AS userId, users.fullName as senderName, users.picture 
      FROM ${table} m
      INNER JOIN users ON users.id = IF (sender_id = ${id}, recipient_id, sender_id) 
      WHERE (sender_id=${id} OR recipient_id=${id}) AND m.isLast = 1
      ORDER BY m.createdAt DESC
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

exports.getMessagesCountByCondition = (recipient_id, sender_id, cond) => {
  return new Promise((resolve, reject) => {
    const query = dbConn.query(
      `
    SELECT COUNT(id) as totalData 
    FROM ${table}
    WHERE ((sender_id=${recipient_id} AND recipient_id=${sender_id})
    OR (recipient_id=${recipient_id} AND sender_id=${sender_id}))
    LIKE "%${cond.search}%"
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
