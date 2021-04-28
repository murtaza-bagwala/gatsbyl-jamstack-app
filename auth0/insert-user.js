 
/* INSERT USER RULE FOR AUTH0 */ 

function (user, context, callback) {
  const id = user.user_id;
  const name = user.nickname;
  const email = user.email;
  const url = "https://<REPLACE-WITH-URL>.com/v1/graphql";
  const upsertUserQuery = `
    mutation($id: String!, $name: String!, $email: String!){
      insert_user(objects: [{ id: $id, name: $name, email: $email }], on_conflict: { constraint: user_pkey, update_columns: [] }) {
        affected_rows
      }
    }`;
  const graphqlReq = { "query": upsertUserQuery, "variables": { id, name, email } };

  request.post({
      headers: {"content-type" : "application/json", "x-hasura-admin-secret": "<REPLACE-WITH-SECRET>"},
      url:   url,
      body:  JSON.stringify(graphqlReq)
  }, function(error, response, body){
       console.log(body);
       callback(null, user, context);
  });
}