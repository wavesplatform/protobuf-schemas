pub mod waves {
    tonic::include_proto!("waves");

    pub mod events {
        tonic::include_proto!("waves.events");
    }

    pub mod node {
        pub mod grpc {
            tonic::include_proto!("waves.node.grpc");
        }
    }
}
