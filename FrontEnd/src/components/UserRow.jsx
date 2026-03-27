export default function UserRow({ user }) {
  const date = new Date(user.createdAt).toISOString().split('T')[0];
  const firstLetter = user.fullName.charAt(0).toUpperCase();

  return (
    <tr>
      <td>
        <div className="user-cell">
          <div className="user-avatar avatar-N">{firstLetter}</div>
          <div>
            <div className="user-name">{user.fullName}</div>
            <div className="user-email">{user.email}</div>
          </div>
        </div>
      </td>
      <td><span className="badge badge-farmer">Nông dân</span></td>
      <td><span className="badge badge-status">Đang hoạt động</span></td>
      <td>{date}</td>
      <td style={{ textAlign: 'center' }}><div className="action-dot">⋮</div></td>
    </tr>
  );
}
