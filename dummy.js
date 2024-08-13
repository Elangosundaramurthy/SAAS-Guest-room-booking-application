const editTicketController = async (req, res) => {
    try {
      const body = req.body;
      const ticketId = req.params.id;
      console.log(ticketId, body);
      const permittedKeys = [
        "name",
        "department",
        "description",
        "raisedBy",
        "raisedTo",
        "timeline",
        "status",
        "remarks",
        "closedAt",
        "createdAt",
      ];
  
      let premitted = Object.keys(body).every((key) =>
        permittedKeys.includes(key)
      );
      if (!premitted) {
        return res.status(400).json({ data: {}, error: "Bad Request" });
      }
  
      const { code, data, error } = await editTicket(ticketId, body);
      return res.json({ data, error }).status(code);
    } catch (err) {
      console.error("Error:", err);
      res.status(500).send("Internal Server Error");
    }
  };
  const editTicket = async (ticketId, body) => {
    try {
      const updatedTicket = await Ticket.findOneAndUpdate(
        { _id: ticketId },
        { $set: body },
        { new: true }
      );
  
      return { data: { ticket: updatedTicket }, code: 200, error: "" };
    } catch (err) {
      console.error("Error in updating ticket:", err);
      return { data: {}, code: 500, error: "Internal Server Error" };
    }
  };