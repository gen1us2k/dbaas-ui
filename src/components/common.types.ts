export enum Databases {
  postgresql = 'postgresql',
  mongodb = 'mongodb',
  mysql = 'mysql',
  mariadb = 'mariadb',
  proxysql = 'proxysql',
  haproxy = 'haproxy',
}

export const DATABASE_LABELS = {
  [Databases.mysql]: 'MySQL',
  [Databases.mongodb]: 'MongoDB',
  [Databases.postgresql]: 'PostgreSQL',
  [Databases.proxysql]: 'ProxySQL',
  [Databases.mariadb]: 'MariaDB',
  [Databases.haproxy]: 'HAProxy',
};
export enum Operators {
  pxc = 'pxc',
  psmdb = 'psmdb',
}

export const DatabaseOperators = {
  [Operators.pxc]: DATABASE_LABELS[Databases.mysql],
  [Operators.psmdb]: DATABASE_LABELS[Databases.mongodb],
};
