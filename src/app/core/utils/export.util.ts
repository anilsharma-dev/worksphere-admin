import {
  saveAs
}
from 'file-saver';

import {
  User
}
from '../models/user.model';

export function exportUsersToCSV(
  users: User[]
) {

  const headers = [
    'Name',
    'Email',
    'Role',
    'Status'
  ];

  const rows =
    users.map(user => [

      user.name,
      user.email,
      user.role,
      user.status

    ]);

  const csvContent = [

    headers.join(','),

    ...rows.map(
      row => row.join(',')
    )

  ].join('\n');

  const blob =
    new Blob(
      [csvContent],
      {
        type:
          'text/csv;charset=utf-8;'
      }
    );

  saveAs(
    blob,
    'users.csv'
  );
}