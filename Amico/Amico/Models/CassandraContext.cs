using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cassandra;
namespace Amico.Models
{
    public class CassandraContext
    {
        private static Cassandra.ISession _session;
        public Cassandra.ISession Session { get { return _session; } }

        public CassandraContext()
        {
            var cluster = Cluster.Builder().AddContactPoint("127.0.0.1").Build();
            _session = cluster.Connect("amico");
        }
    }
}
