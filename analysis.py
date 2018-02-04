import sqlite3
from sqlite3 import Error
import csv


def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by the db_file
    :param db_file: database file
    :return: Connection object or None
    """
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except Error as e:
        print(e)

    return None


def weeklyQuery(conn):
    cur = conn.cursor()
    cur.execute("select count(*) as count, week, workflow_state  from (SELECT workflow_state, strftime('%Y-%m-%d', created_at, '-1 day', 'weekday 0', '+1 day') as week FROM applicants) GROUP BY workflow_state, week")

    rows = cur.fetchall()

    # Create the csv file
    with open('applicants.csv', 'w', newline='') as f_handle:
        writer = csv.writer(f_handle)
        # Add the header/column names
        header = ['count', 'week', 'workflow_state']
        writer.writerow(header)
        # Iterate over data  and  write to the csv file
        for row in rows:
            writer.writerow(row)


def main():
    database = "applicants.sqlite3"

    # create a database connection
    conn = create_connection(database)
    with conn:
        weeklyQuery(conn)


if __name__ == '__main__':
    main()
