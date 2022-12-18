export function getRelativeTime(currentTime: Date, otherTime: Date) {
  const diffInSeconds = (currentTime.getTime() - otherTime.getTime()) / 1000;

  if (diffInSeconds < 60) {
    return `${Math.floor(diffInSeconds)} seconds ago`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  } else {
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  }
}
