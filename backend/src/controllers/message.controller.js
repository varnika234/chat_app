export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filterUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filterUsers);
    }
    catch (error) {
        console.log("Error in getUserForSideBar:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getMessage = async (req,res)=>{
    try{
        const { id: userToChatId }= req.params;
        const myId= req.user._id;
        const message= await MessageChannel.find({
            $or:[
                {senderId: myId, receiverId:userToChatId},
                {senderId: userToChatId, receiverId:myId },
            ],
        });
        req.status(200).json
    }
    catch(error){
        
    }
}