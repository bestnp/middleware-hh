export const validateCreateAssignmentData = (req, res, next) => {

    const { title, content, category, email } = req.body || {};
    if (!title || !content || !category || !email) {
        return res.status(400).json({
            message: "กรุณาใส่ข้อมูลให้ครบทุกช่องก่อนส่งข้อมูลด้วยครับ",
        });
    }

    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailFormat.test(email)) {
        return res.status(400).json({
            message: "รูปแบบอีเมล์ไม่ถูกต้อง เช่น example@mail.com",
        });
    }

    const assignmentCategoryList = ["Math", "English", "Biology"];
    const hasAssignmentCategoryList = assignmentCategoryList.includes(req.body.category);
    if (!hasAssignmentCategoryList) {
        return res.status(400).json({
            message: "กรุณาส่งข้อมูล Category ของแบบทดสอบตามที่กำหนด เช่น 'Math','English' หรือ 'Biology'",
        });
    }

    if (req.body.content.length <= 500 || req.body.content.length >= 1000) {
        return res.status(400).json({
            message: "ข้อความต้องมีความยาวอยู่ในระหว่าง 500 - 1000 ตัวอักษร",
        });
    }

    next();
}