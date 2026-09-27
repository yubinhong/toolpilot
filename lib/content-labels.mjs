export function verificationStatusLabel(record, isPublished) {
  return isPublished && record?.verifiedAt
    ? `Last verified ${record.verifiedAt}`
    : 'Not yet formally verified';
}
