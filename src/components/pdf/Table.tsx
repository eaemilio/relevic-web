import React, { ReactNode } from 'react';
import { View, StyleSheet, Text } from '@react-pdf/renderer';
import { config } from './config';

const styles = StyleSheet.create({
  table: {
    width: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: config.primaryColor,
    color: '#fff',
    padding: 3,
  },
  headerCell: {
    fontWeight: 'heavy',
    white: '#fff',
    width: '14.29%',
    fontSize: config.normalFontSize,
  },
  body: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  cell: {
    width: '14.29%',
    paddingHorizontal: 2,
    fontSize: config.normalFontSize,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 3px',
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 1,
  },
});

const Table = ({ children }: { children: ReactNode }) => (
  <View style={styles.table}>{children}</View>
);

const TableHeader = ({ children }: { children: ReactNode }) => (
  <View style={styles.header}>{children}</View>
);

const TableHeaderCell = ({ children, style }: { children: ReactNode; style?: any }) => (
  <Text style={[styles.cell, style]}>{children}</Text>
);

const TableBody = ({ children }: { children: ReactNode }) => (
  <View style={styles.body}>{children}</View>
);

const TableRow = ({ children }: { children: ReactNode }) => (
  <View style={styles.row}>{children}</View>
);

const TableCell = ({ children, style }: { children: ReactNode; style?: any }) => (
  <Text style={[styles.cell, style]}>{children}</Text>
);

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.HeaderCell = TableHeaderCell;
Table.Cell = TableCell;

export default Table;
