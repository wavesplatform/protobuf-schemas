// Re-export prost & tonic crates, so that users of this library can use the same versions seamlessly
pub use {prost, tonic};

pub mod waves {
    tonic::include_proto!("waves");

    pub mod events {
        tonic::include_proto!("waves.events");

        pub mod grpc {
            tonic::include_proto!("waves.events.grpc");
        }
    }

    pub mod node {
        pub mod grpc {
            tonic::include_proto!("waves.node.grpc");
        }
    }
}
