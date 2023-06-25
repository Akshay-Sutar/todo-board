const uuid4 = require("uuid4");

function getStringId() {
  const id = uuid4();
  return id;
}

module.exports = {
  getStringId,
};
