export const validateNotificationDescription = type => {
   if (type === "REVIEW_UPLOAD") return ""
   if (type === "REVIEW_WITHDRAWAL") return ""
   if (type === "REVIEW_CHANGE_REQUEST") return ""
}