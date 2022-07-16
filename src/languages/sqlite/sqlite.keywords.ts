import { flatKeywordList } from '../../utils';

export const keywords = flatKeywordList({
  // https://github.com/trinodb/trino/blob/432d2897bdef99388c1a47188743a061c4ac1f34/core/trino-parser/src/main/antlr4/io/trino/sql/parser/SqlBase.g4#L858-L1128
  all: [
    'ABORT',
    'ACTION',
    'ADD',
    'AFTER',
    'ALL',
    'ALTER',
    // 'AND',
    'ANY',
    'ARE',
    'ARRAY',
    'ALWAYS',
    'ANALYZE',
    'AS',
    'ASC',
    'ATTACH',
    'AUTOINCREMENT',
    'BEFORE',
    'BEGIN',
    'BETWEEN',
    'BY',
    'CASCADE',
    'CASE',
    'CAST',
    'CHECK',
    'COLLATE',
    'COLUMN',
    'COMMIT',
    'CONFLICT',
    'CONSTRAINT',
    'CREATE',
    'CROSS',
    'CURRENT',
    'CURRENT_DATE',
    'CURRENT_TIME',
    'CURRENT_TIMESTAMP',
    'DATABASE',
    'DEFAULT',
    'DEFERRABLE',
    'DEFERRED',
    'DELETE',
    'DESC',
    'DETACH',
    'DISTINCT',
    'DO',
    'DROP',
    'EACH',
    'ELSE',
    'END',
    'ESCAPE',
    'EXCEPT',
    'EXCLUDE',
    'EXCLUSIVE',
    'EXISTS',
    'EXPLAIN',
    'FAIL',
    'FILTER',
    'FIRST',
    'FOLLOWING',
    'FOR',
    'FOREIGN',
    'FROM',
    'FULL',
    'GENERATED',
    'GLOB',
    'GROUP',
    'GROUPS',
    'HAVING',
    'IF',
    'IGNORE',
    'IMMEDIATE',
    'IN',
    'INDEX',
    'INDEXED',
    'INITIALLY',
    'INNER',
    'INSERT',
    'INSTEAD',
    'INTERSECT',
    'INTO',
    'IS',
    'ISNULL',
    'JOIN',
    'KEY',
    'LAST',
    'LEFT',
    'LIKE',
    'LIMIT',
    'MATCH',
    'MATERIALIZED',
    'NATURAL',
    'NO',
    'NOT',
    'NOTHING',
    'NOTNULL',
    'NULL',
    'NULLS',
    'OF',
    'OFFSET',
    'ON',
    'ONLY',
    'OPEN',
    // 'OR',
    'ORDER',
    'OTHERS',
    'OUTER',
    'OVER',
    'PARTITION',
    'PLAN',
    'PRAGMA',
    'PRECEDING',
    'PRIMARY',
    'QUERY',
    'RAISE',
    'RANGE',
    'RECURSIVE',
    'REFERENCES',
    'REGEXP',
    'REINDEX',
    'RELEASE',
    'RENAME',
    'REPLACE',
    'RESTRICT',
    'RETURNING',
    'RIGHT',
    'ROLLBACK',
    'ROW',
    'ROWS',
    'SAVEPOINT',
    'SELECT',
    'SET',
    'TABLE',
    'TEMP',
    'TEMPORARY',
    'THEN',
    'TIES',
    'TO',
    'TRANSACTION',
    'TRIGGER',
    'UNBOUNDED',
    'UNION',
    'UNIQUE',
    'UPDATE',
    'USING',
    'VACUUM',
    'VALUES',
    'VIEW',
    'VIRTUAL',
    'WHEN',
    'WHERE',
    'WINDOW',
    'WITH',
    'WITHOUT',
  ],
  constraints: ['ON DELETE', 'ON UPDATE'],
});
