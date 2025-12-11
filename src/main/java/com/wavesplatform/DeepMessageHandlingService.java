package com.wavesplatform;

import com.wavesplatform.events.api.grpc.protobuf.BlockchainUpdates;
import io.grpc.*;
import io.grpc.protobuf.ProtoUtils;
import io.grpc.stub.ClientCalls;
import io.grpc.stub.StreamObserver;

import java.util.concurrent.TimeUnit;

import static com.wavesplatform.events.api.grpc.protobuf.BlockchainUpdatesApiGrpc.getSubscribeMethod;

public class DeepMessageHandlingService {
    private static final int RECURSION_LIMIT = 200;

    public static void main(String[] args) throws InterruptedException {
        MethodDescriptor<BlockchainUpdates.SubscribeRequest, BlockchainUpdates.SubscribeEvent> methodDescriptor = getSubscribeMethod()
                .toBuilder()
                .setResponseMarshaller(ProtoUtils.marshallerWithRecursionLimit(BlockchainUpdates.SubscribeEvent.getDefaultInstance(), RECURSION_LIMIT))
                .build();

        ManagedChannel ch = ManagedChannelBuilder
                .forAddress("grpc.wavesnodes.com", 6881)
                .usePlaintext()
                .enableRetry()
                .build();

        BlockchainUpdates.SubscribeRequest request = BlockchainUpdates.SubscribeRequest.newBuilder()
                .setFromHeight(4240683)
                .setToHeight(4240683)
                .build();

        StreamObserver<BlockchainUpdates.SubscribeEvent> obs = new StreamObserver<>() {
            @Override
            public void onNext(BlockchainUpdates.SubscribeEvent value) {
                System.out.println(value.getUpdate().getHeight());
            }

            @Override
            public void onError(Throwable t) {
                t.printStackTrace();
            }

            @Override
            public void onCompleted() {
                System.out.println("Completed");
            }
        };

        ClientCalls.asyncServerStreamingCall(
                ch.newCall(methodDescriptor, CallOptions.DEFAULT), request, obs);

        ch.awaitTermination(1000, TimeUnit.SECONDS);
        System.out.println("Shutting down");
    }
}
