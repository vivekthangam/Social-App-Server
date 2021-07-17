module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String,
        description: String,
        Status: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Tutorial = mongoose.model("Todo", schema);
    return Tutorial;
  };